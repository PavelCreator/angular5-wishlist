import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Wish } from '../entities/wish';
import { Constants } from './constants.service';

@Injectable()
export class WishService {
  private wishesUrl = 'api/heroes';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private mode = Constants.Modes.Guest;
  private wishes: Wish[] = [];

  //TODO check auth and switch mode to 'user' if user authenticated

  constructor(private http: Http) { }

  getWishes(): Promise<Wish[]>{

    //return this.wishes;
   // return Promise.resolve(this.wishes);
    return new Promise<Wish[]>((resolve, reject) => {
      var wishes = localStorage.getItem("wishes");
      if (wishes) {
        this.wishes = JSON.parse(wishes);
        resolve(this.wishes);
        console.log("localStorage wishes =", wishes);
      } else {
        this.http.get(this.wishesUrl)
          .toPromise()
          .then(response => {
            var wishes = response.json().data as Wish[];
            console.log("db wishes =", wishes);
            resolve(wishes);
          });
          //.catch(this.handleError);
      }
    });
  }

/*  getWish(id:number): Wish {
    let wishes = this.getWishes();
    let wish = wishes.find(wish => wish.id === id)
    return wish;
  }*/

  getWish(id:number):Promise<Wish> {
    return this.getWishes()
      .then(wishes => wishes.find(wish => wish.id === id));
  }

  update(wish:Wish):Promise<Wish> {
    const url = `${this.wishesUrl}/${wish.id}`;
    return this.http
      .put(url, JSON.stringify(wish), {headers: this.headers})
      .toPromise()
      .then(() => wish);
      //.catch(this.handleError);
  }

  create(name: string): Promise<Wish> {
    var newWish:Wish = {
      id: null,
      name: name,
      done: false
    };
    this.wishes.push(newWish);
    localStorage.setItem("wishes", JSON.stringify(this.wishes));
    return Promise.resolve(newWish);
    /*    return this.http
      .post(this.wishesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Wish)
      .catch(this.handleError);*/
  }

  delete(wish: Wish): Promise<void> {
    var wishes = this.wishes;
    this.wishes = this.wishes.filter(w => w !== wish);
    localStorage.setItem("wishes", JSON.stringify(this.wishes));
    return Promise.resolve(null);

/*    const url = `${this.wishesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);*/
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

