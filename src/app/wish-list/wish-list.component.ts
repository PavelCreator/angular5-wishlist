import { Component, OnInit, Renderer2 } from '@angular/core';
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

  constructor(private router: Router,
              private wishListService: WishListService,
              private wishService: WishService,
              private renderer: Renderer2) {
  }

  getWishes(): void {
    this.wishListService.getWishes()
      .then(wishes => this.wishes = wishes);
  }

  ngOnInit(): void {
    this.getWishes();
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
    this.wishes = this.wishes.filter(h => h !== wish);
  }

  updateList(): void {
    this.wishListService.updateList(this.wishes)
      .catch((wishes) => this.wishes = wishes);
  }
}
