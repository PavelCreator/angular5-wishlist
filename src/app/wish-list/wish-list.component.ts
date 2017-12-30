import { Component, OnInit } from '@angular/core';
import { Wish } from '../interfaces/wish';
import { WishService } from '../wish/wish.service';
import { WishListService } from './wish-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wl-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})

export class WishListComponent implements OnInit {
  title = 'Wannado';
  wishes: Wish[];
  hideDoneStatus = false;
  private editWishMode = false;

  constructor(private router: Router,
              private wishListService: WishListService,
              private wishService: WishService) {
  }

  getWishes(): void {
    this.wishListService.getWishes()
      .then(wishes => this.wishes = wishes);
  }

  ngOnInit(): void {
    this.getWishes();
  }

  gotoDetail(id: string): void {
    this.router.navigate(['/detail', id]);
  }

  toggleWishStatus(wishId: string) {
    if (this.editWishMode) {
      return;
    }
    this.wishListService.toggleWishStatus(wishId)
      .then((wishes) => this.wishes = wishes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.wishListService.createWish(name)
      .then();
  }

  deleteWish(wish: Wish): void {
    this.wishListService
      .deleteWish(wish)
      .then(
        () => {
          this.wishes = this.wishes.filter(h => h !== wish);
        }
      );
  }

  editWishNameStart(wish: Wish, $event: Event): void {
    $event.stopPropagation();
    this.editWishMode = true;
    wish.edit = true;
  }

  editWishNameComplete(wish: Wish, $event: any): void {
    console.log('$event =', $event);
    if ($event) {
      $event.stopPropagation();
    }
    this.wishService
      .changeField(wish, 'name', wish.name)
      .then(
        () => {
          for (let i = 0; i < this.wishes.length; i++) {
            const _wish = this.wishes[i];
            if (_wish.id === wish.id) {
              _wish.edit = false;
            }
          }
          this.editWishMode = false;
        }
      );
  }

  updateList(): void {
    this.wishListService.updateList(this.wishes)
      .catch((wishes) => this.wishes = wishes);
  }
}
