import { Injectable } from '@angular/core';
//import { Headers, Http } from '@angular/http';
import { UUID } from 'angular2-uuid';

import 'rxjs/add/operator/toPromise';

import { Wish } from '../entities/wish';
import { Constants } from './constants.service';
import { DataMockService } from '../api/data-mock.service';
import { LS } from '../services/local-storage.service';

@Injectable()
export class WishService {
  //private wishesUrl = 'api/heroes';  // URL to web api
  //private headers = new Headers({'Content-Type': 'application/json'});
  private mode = Constants.Modes.Guest;
  private wishes: Wish[] = [];

  //TODO check auth and switch mode to 'user' if user authenticated

  constructor(
    //private http: Http,
    private dataMockService: DataMockService,
    private ls: LS
  ) { }

  loadDataMock(): void {
    this.ls.clear();
    this.dataMockService.getWishes();
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
/*          this.http.get(this.wishesUrl)
            .toPromise()
            .then(response => {
              this.wishes = response.json().data as Wish[];
              console.log("db wishes =", this.wishes);
              resolve(this.wishes);
            });*/
          break;
      }
    });
  }

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
          /*let wishes = this.getWishes();
          let wish = wishes.find(wish => wish.id === id)
          return wish;*/
          break;
      }
    });
  }

  generateWish(name: string) {
    let newWish: Wish = {
      id: UUID.UUID(),
      name: name,
      done: false
    };
    this.wishes.push(newWish);
    return newWish;
  }

  create(name: string): Promise<Wish[]> {
    return new Promise<Wish[]>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          let newWish = this.generateWish(name);
          this.ls.addWish(newWish);
          resolve();
          break;

        case Constants.Modes.User:
          /*    return this.http
  .post(this.wishesUrl, JSON.stringify({name: name}), {headers: this.headers})
  .toPromise()
  .then(res => res.json().data as Wish)
  .catch(this.handleError);*/
          break;
      }
    });
  }

  toggleStatus(id: string): Promise<Wish[]> {
    return new Promise<Wish[]>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          for (let i = 0; i < this.wishes.length; i++){
            let wish = this.wishes[i];
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

  delete(wish: Wish): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:

          this.wishes = this.wishes.filter(w => w !== wish);
          this.ls.deleteWish(wish.id);
          resolve();
          break;

        case Constants.Modes.User:
          /*    const url = `${this.wishesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);*/
          break;
      }
    });
  }

/*  update(wish: Wish): Promise<Wish> {
    const url = `${this.wishesUrl}/${wish.id}`;
    return this.http
      .put(url, JSON.stringify(wish), {headers: this.headers})
      .toPromise()
      .then(() => wish);
      //.catch(this.handleError);
  }*/

  updateList(wishes: Wish[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          this.wishes = wishes;
          this.ls.sortList(wishes);
          resolve();
          break;

        case Constants.Modes.User:
          reject(this.wishes);
          break;
      }
    });
  }

/*  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }*/

}

