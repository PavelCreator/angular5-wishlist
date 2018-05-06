import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Wish } from '../interfaces/wish';
import { WishService } from '../wish/wish.service';
import { Router } from '@angular/router';
import { WishListService } from '../wish-list/wish-list.service';
import { WishInListService } from './wish-in-list.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'wl-wish-in-list',
  templateUrl: './wish-in-list.component.html',
  styleUrls: ['./wish-in-list.component.scss']
})

export class WishInListComponent {
  @Input() wish: Wish;
  @Input() index: number;
  @Output() wishDelete: EventEmitter<any> = new EventEmitter();

  @ViewChild('nameWidth')
  nameWidth: ElementRef;

  inputWidth: number;

  constructor(private router: Router,
              private wishService: WishService,
              private wishListService: WishListService,
              private wishInListService: WishInListService,
              private renderer: Renderer2,
              public toastr: ToastsManager,
              vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.wish.id]);
  }

  toggleWishStatus() {
    if (this.wishInListService.editWishMode) { return; }
    this.wishInListService.toggleWishStatus(this.wish.id)
      .then(() => this.wish.done = !this.wish.done);
  }

  deleteWish(): void {
    this.wishListService
      .deleteWish(this.wish)
      .then(() => this.wishDelete.emit());
  }

  editWishNameStart($event: Event): void {
    $event.stopPropagation();

    this.inputWidth = this.nameWidth.nativeElement.offsetWidth + 10;

/*    const onElement = this.renderer.selectRootElement('#wishNewNameInput');
    onElement.focus();*/

    this.wishInListService.editWishMode = true;
    this.wish.edit = true;
  }

  editWishNameComplete($event: any): void {
    if (this.wish.name === '') {
      this.toastr.warning('Please enter wish name', null, {dismiss: 'click'});
      return;
    }
    this.wishService
      .changeField(this.wish, 'name', this.wish.name)
      .then(
        () => {
          this.wish.edit = false;
          this.wishInListService.editWishMode = false;
        }
      );
  }
}