import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Wish } from '../interfaces/wish';
import { Constants } from '../services/constants.service';
import { LS } from '../services/local-storage.service';
import { UUID } from 'angular2-uuid';
import { ApiService } from '../api/api.service';
import { BaseWishListService } from './base-wish-list.service';

@Injectable()
export class WishListService {
  private mode = Constants.Modes.Guest;
  private wishes: Wish[] = [];

  constructor(
    private apiService: ApiService,
    private ls: LS,
    private baseWishListService: BaseWishListService
  ) { }

  /*Work with wishList*/
  getWishes(): Promise<Wish[]> {
    return new Promise<Wish[]>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:

          this.ls.clear();

          let wishesString = this.ls.getWishListString();

          if (!wishesString) {
            this.ls.clear();
            this.baseWishListService.getBaseWishList()
              .then((wishes) => {
                this.baseWishListService.uploadBaseWishListToLS(wishes);
                wishesString = this.ls.getWishListString();
                this.wishes = this.ls.parseWishListString(wishesString);
                resolve(this.wishes || []);
              });
          }
          break;

        case Constants.Modes.User:
          break;
      }
    });
  }

  updateList(wishes: Wish[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          this.wishes = wishes;
          this.ls.sortList(wishes);
          resolve();
          break;

        case Constants.Modes.User:
          break;
      }
    });
  }

  /*Work with wishes on wishList page*/
  generateWish(name: string) {
    const newWish: Wish = {
      id: UUID.UUID(),
      name: name,
      done: false,
      edit: false
    };
    this.wishes.push(newWish);
    return newWish;
  }

  createWish(name: string): Promise<Wish[]> {
    return new Promise<Wish[]>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          const newWish = this.generateWish(name);
          this.ls.addWish(newWish);
          resolve();
          break;

        case Constants.Modes.User:
          break;
      }
    });
  }

  deleteWish(wish: Wish): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          this.wishes = this.wishes.filter(w => w !== wish);
          this.ls.deleteWish(wish.id);
          resolve();
          break;

        case Constants.Modes.User:
          break;
      }
    });
  }

}

