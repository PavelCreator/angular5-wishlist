import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UUID } from 'angular2-uuid';

import 'rxjs/add/operator/toPromise';

import { Wish } from '../entities/wish';
import { Constants } from './constants.service';
import { DataMockService } from '../api/data-mock.service';

@Injectable()
export class WishService {
  private wishesUrl = 'api/heroes';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private mode = Constants.Modes.Guest;
  private wishes: Wish[] = [];

  //TODO check auth and switch mode to 'user' if user authenticated

  constructor(
    private http: Http,
    private dataMockService: DataMockService
  ) { }

  getWishes(): Promise<Wish[]> {
    return new Promise<Wish[]>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          let wishesString = localStorage.getItem("wishes");
          this.wishes = wishesString ? JSON.parse(wishesString) : this.dataMockService.getWishes();
          resolve(this.wishes || []);
          break;

        case Constants.Modes.User:
          this.http.get(this.wishesUrl)
            .toPromise()
            .then(response => {
              this.wishes = response.json().data as Wish[];
              console.log("db wishes =", this.wishes);
              resolve(this.wishes);
            });
          break;
      }
    });
  }

  getWish(id: string): Promise<Wish> {
    return new Promise<Wish>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          if (this.wishes){
            let wish = this.wishes.find(wish => wish.id === id);
            resolve(wish);
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
    console.log("newWish =", newWish);
    this.wishes.push(newWish);
    return newWish;
  }

  create(name: string): Promise<Wish[]> {
    return new Promise<Wish[]>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          this.generateWish(name);
          localStorage.setItem("wishes", JSON.stringify(this.wishes));
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
            }
          }
          localStorage.setItem("wishes", JSON.stringify(this.wishes));
          resolve(this.wishes);
          break;

        case Constants.Modes.User:
          break;
      }
    });
  }

  delete(wish: Wish): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.wishes = this.wishes.filter(w => w !== wish);
      switch (this.mode) {
        case Constants.Modes.Guest:
          localStorage.setItem("wishes", JSON.stringify(this.wishes));
          resolve(null);
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

  update(wish: Wish): Promise<Wish> {
    const url = `${this.wishesUrl}/${wish.id}`;
    return this.http
      .put(url, JSON.stringify(wish), {headers: this.headers})
      .toPromise()
      .then(() => wish);
      //.catch(this.handleError);
  }

/*  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }*/

  /*private wishes: Wish[] = [
    {id: 1, name: 'Забросить ботинки на провода', done: true},
    {id: 2, name: 'Прокатиться на крыше транспортного средства', done: true},
    {id: 3, name: 'Сделать настоящее тату', done: true},
    {id: 4, name: 'Научиться прыгать на скейте', done: false},
    {id: 5, name: 'Сыграть в казино', done: false},
    {id: 6, name: 'Сняться в рекламе', done: true},
    {id: 7, name: 'Три дня не разговаривать', done: true},
    {id: 8, name: 'Посмотреть «Звёздные войны»', done: true},
    {id: 9, name: 'Пройти какую-нибудь игру', done: true},
    {id: 10, name: 'Посмотреть дом, в котором провёл детство', done: true},
    {id: 11, name: 'Придумать песню на укулеле', done: false},
    {id: 12, name: 'Научиться ездить на велосипеде без рук', done: true},
    {id: 13, name: 'Принять участие в спортивных соревнованиях', done: false},
    {id: 14, name: 'Принять участие в разработке приложения', done: false},
    {id: 15, name: 'Прокатиться на мотоцикле', done: true},
    {id: 16, name: 'Пройтись по улице с бумбоксом', done: false},
    {id: 17, name: 'Прокатиться на сноуборде', done: true},
    {id: 18, name: 'Освоить музыкальную программу и записать бит', done: false},
    {id: 19, name: 'Научиться вязать', done: false},
    {id: 20, name: 'Не брить бороду полгода', done: true}
  ];*/

}

