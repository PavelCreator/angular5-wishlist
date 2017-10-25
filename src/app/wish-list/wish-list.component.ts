import {Component, OnInit} from '@angular/core';
import {Wish} from '../entities/wish';
import {WishListService} from './wish-list.service';
import {Router} from '@angular/router';

@Component({
  selector: 'my-wishes',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})

export class WishListComponent implements OnInit {
  title = 'Wannado';
  wishes: Wish[];

  constructor(private router: Router,
              private wishListService: WishListService) {
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

  updateList(): void {
    this.wishListService.updateList(this.wishes)
      .catch((wishes) => this.wishes = wishes);
  }
}
