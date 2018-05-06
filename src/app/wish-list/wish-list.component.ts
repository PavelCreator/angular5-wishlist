import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';

import {Wish} from '../interfaces/wish';
import {Direction} from '../enums/direction.enum';

import {WishService} from '../wish/wish.service';
import {WishListService} from './wish-list.service';
import {WishInListService} from '../wish-in-list/wish-in-list.service';
import {LS} from '../services/local-storage.service';

@Component({
  selector: 'wl-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})

export class WishListComponent implements OnInit {
  title = 'Wannado';
  wishes: Wish[];
  hideDoneStatus = false;
  direction: any;
  @ViewChild('wishNameInput') wishNameInput: ElementRef;

  constructor(private renderer: Renderer2,
              private wishService: WishService,
              public wishListService: WishListService,
              private wishInListService: WishInListService,
              public toastr: ToastsManager,
              private ls: LS,
              vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {
    this.getWishes();
    this.direction = Direction;
    this.wishListService.addWishDirection = this.ls.getAddWishDirection() || this.direction.START;
  }

  getWishes(): void {
    this.wishListService.getWishes()
      .then(wishes => this.wishes = wishes);
  }

  addWish(name: string): void {
    name = name.trim();
    if (name === '') {
      this.toastr.warning('Please enter wish name', null, {dismiss: 'click'});
      setTimeout(() => {
        this.wishNameInput.nativeElement.focus();
      });
      return;
    }
    const newWish = this.wishListService.generateWish(name);
    this.wishListService
      .createWishOnBE(newWish)
      .then((data) => {
        const command = this.wishListService.arrayAddDirectionCommand();
        this.wishes[command](newWish);
      });
  }

  selectDirectionAddWish(direction): void {
    this.wishListService.addWishDirection = direction;
    this.ls.setAddWishDirection(direction);
  }

  deleteWish(wish: Wish): void {
    this.wishes = this.wishes.filter(h => h !== wish);
  }

  updateList(): void {
    this.wishListService.updateList(this.wishes)
      .catch((wishes) => this.wishes = wishes);
    // TODO check that changes saved
  }
}
