import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { WishService } from '../services/wish.service';
import { Wish } from '../entities/wish';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'wish-detail',
  templateUrl: './wish-detail.component.html',
  styleUrls: [ './wish-detail.component.css' ],
})

export class WishDetailComponent implements OnInit {
  @Input() wish: Wish;

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

  save(): void {
    this.wishService.update(this.wish)
      .then(() => this.goBack());
  }
}
