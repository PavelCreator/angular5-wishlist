import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Wish } from '../entities/wish';
import { Constants } from '../services/constants.service';
import { DataMockService } from '../api/data-mock.service';
import { LS } from '../services/local-storage.service';

@Injectable()
export class WishService {
  private mode = Constants.Modes.Guest;
  private wishes: Wish[] = [];

  constructor(
    private dataMockService: DataMockService,
    private ls: LS
  ) { }

  getWish(id: string): Promise<Wish> {
    return new Promise<Wish>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          let wishString = this.ls.getWishString(id);
          if (wishString){
            resolve(this.ls.parseWishString(wishString));
          }
          break;

        case Constants.Modes.User:
          break;
      }
    });
  }

  changeField(wish: Wish, field: string, value: any): Promise<void> {
    console.log("changeField  field =", field);
    return new Promise<void>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          let _wish = this.ls.getWish(wish.id);
          _wish[field] = value;
          this.ls.updateWish(_wish);
          resolve();
          break;

        case Constants.Modes.User:
          break;
      }
    });
  }

  delete(wish: Wish): Promise<void> {
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

  update(updatedWish: Wish): Promise<Wish> {
    //const url = `${this.wishesUrl}/${wish.id}`;
    return new Promise<Wish>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          for (let i = 0; i < this.wishes.length; i++) {
            let wish = this.wishes[i];
            if (wish.id === updatedWish.id) {
              wish = updatedWish;
              this.ls.updateWish(wish);
              break;
            }
          }
          break;

        case Constants.Modes.User:
          break;
      }
    });
  }

}

