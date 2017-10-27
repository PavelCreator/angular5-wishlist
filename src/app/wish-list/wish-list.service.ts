import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Wish } from '../entities/wish';
import { Constants } from '../services/constants.service';
import { DataMockService } from '../api/data-mock.service';
import { LS } from '../services/local-storage.service';
import { UUID } from 'angular2-uuid';

@Injectable()
export class WishListService {
  private mode = Constants.Modes.Guest;
  private wishes: Wish[] = [];

  constructor(
    //private http: Http,
    private dataMock: DataMockService,
    private ls: LS
  ) { }

  /*Work with wishList*/
  loadDataMock(): void {
    this.ls.clear();
    this.dataMock.getWishes();
  }

  getWishes(): Promise<Wish[]> {
    return new Promise<Wish[]>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:

          let wishesString = this.ls.getWishListString();

          if (!wishesString){
            this.loadDataMock();
            wishesString = this.ls.getWishListString();
          }

          this.wishes = this.ls.parseWishListString(wishesString);
          resolve(this.wishes || []);
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
    let newWish: Wish = {
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
          let newWish = this.generateWish(name);
          this.ls.addWish(newWish);
          resolve();
          break;

        case Constants.Modes.User:
          break;
      }
    });
  }

  toggleWishStatus(id: string): Promise<Wish[]> {
    console.log('toggleStatus');
    return new Promise<Wish[]>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          for (let i = 0; i < this.wishes.length; i++){
            let wish = this.wishes[i];
            console.log("wish =", wish);
            if (wish.id === id) {
              wish.done = !wish.done;
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

  changeWishField(wish: Wish, field: string, value: any): Promise<void> {
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

}

