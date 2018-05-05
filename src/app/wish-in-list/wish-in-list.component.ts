import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Wish } from '../interfaces/wish';
import { WishService } from '../wish/wish.service';
import { Router } from '@angular/router';
import { WishListService } from '../wish-list/wish-list.service';
import { WishInListService } from './wish-in-list.service';

@Component({
  selector: 'wl-wish-in-list',
  templateUrl: './wish-in-list.component.html',
  styleUrls: ['./wish-in-list.component.scss']
})

export class WishInListComponent {
  @Input() wish: Wish;
  @Input() index: number;
  @Output() wishDelete: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
              private wishService: WishService,
              private wishListService: WishListService,
              private wishInListService: WishInListService,
              private renderer: Renderer2) {
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

/*    const onElement = this.renderer.selectRootElement('#wishNewNameInput');
    onElement.focus();*/

    this.wishInListService.editWishMode = true;
    this.wish.edit = true;
  }

  editWishNameComplete($event: any): void {
    if (this.wish.name === '') {
// TODO add toast notification
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
