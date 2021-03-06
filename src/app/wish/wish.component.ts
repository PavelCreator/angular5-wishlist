import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { WishService } from './wish.service';
import { Wish } from '../interfaces/wish';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'wl-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.scss'],
})

export class WishComponent implements OnInit {
  @Input() wish: Wish;
  @Input() editNameMode: Boolean = false;

  constructor(private wishService: WishService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.wishService.getWish(params['id']))
      .subscribe((wish: Wish) => this.wish = wish);
  }

  goBack(): void {
    this.location.back();
  }

  update(): void {
    this.wishService.update(this.wish)
      .then(() => this.goBack());
  }

  saveChangedName() {
    this.wishService.changeField(this.wish, 'name', this.wish.name)
      .then(() => this.editNameMode = false);
  }

  toggleStatus() {
    this.wishService.changeField(this.wish, 'done', !this.wish.done)
      .then(() => this.wish.done = !this.wish.done);
  }

}
