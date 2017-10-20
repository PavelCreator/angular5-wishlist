import { Component, OnInit } from '@angular/core';
import { Wish } from '../entities/wish';
import { WishService } from '../services/wish.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-wishes',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})

export class WishListComponent implements OnInit {
  title = 'Wannado';
  wishes: Wish[];
  selectedWish: Wish;

  constructor(
        private router: Router,
        private wishService: WishService) { }

/*  getWishes(): void {
    this.wishService.getWishes().then(wishes => this.wishes = wishes);
  }*/

  getWishes(): void {
    this.wishService.getWishes().then(wishes => this.wishes = wishes);
  }

  ngOnInit(): void {
    this.getWishes();
  }

  onSelect(wish:Wish):void {
    this.selectedWish = wish;
  }

  gotoDetail():void {
    this.router.navigate(['/detail', this.selectedWish.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.wishService.create(name)
      .then(
    /*wish => {
        this.wishes.push(wish);
        this.selectedWish = null;
      }*/
      );
  }

  delete(wish: Wish): void {
    this.wishService
        .delete(wish)
        .then(
          () => {
          this.wishes = this.wishes.filter(h => h !== wish);
          if (this.selectedWish === wish) { this.selectedWish = null; }
        }
        );
  }
}
