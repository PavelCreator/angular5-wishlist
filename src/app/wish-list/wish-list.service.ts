import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';

import {Wish} from '../interfaces/wish';
import {Constants} from '../services/constants.service';
import {LS} from '../services/local-storage.service';
import {UUID} from 'angular2-uuid';
import {ApiService} from '../api/api.service';
import {BaseWishListService} from './base-wish-list.service';
import {Direction} from '../enums/direction.enum';

@Injectable()
export class WishListService {
  private mode = Constants.Modes.Guest;
  private wishes: Wish[] = [];
  public addWishDirection: string;

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
    return newWish;
  }

  arrayAddDirectionCommand(): string {
    return this.addWishDirection === Direction.START ? 'unshift' : 'push';
  }

  createWishOnBE(wish: Wish): Promise<Wish[]> {
    return new Promise<Wish[]>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          this.ls.addWish(wish, this.arrayAddDirectionCommand());
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

