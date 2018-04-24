import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Wish } from '../interfaces/wish';
import { Constants } from '../services/constants.service';
import { LS } from '../services/local-storage.service';

@Injectable()
export class WishService {
  private mode = Constants.Modes.Guest;
  private wishes: Wish[] = [];

  constructor(
    //private http: Http,
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

  toggleStatus(id: string): Promise<Wish[]> {
    console.log('toggleStatus');
    return new Promise<Wish[]>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          console.log("this.wishes =", this.wishes);
          for (let i = 0; i < this.wishes.length; i++){
            let wish = this.wishes[i];
            console.log("wish =", wish);
            if (wish.id === id) {
              console.log("1");
              wish.done = !wish.done;
              console.log("wish =", wish);
              this.ls.updateWish(wish);
              break;
            }
          }
          resolve(this.wishes);
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

