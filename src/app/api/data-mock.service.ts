import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Wish } from '../entities/wish';
import { LS } from '../services/local-storage.service';

@Injectable()
export class DataMockService {
  private wishes: Wish[] = [
    {id: '', name: 'Забросить ботинки на провода', done: true},
    {id: '', name: 'Прокатиться на крыше транспортного средства', done: true},
    {id: '', name: 'Сделать настоящее тату', done: true},
    {id: '', name: 'Научиться прыгать на скейте', done: false},
    {id: '', name: 'Сыграть в казино', done: false},
    {id: '', name: 'Сняться в рекламе', done: true},
    {id: '', name: 'Три дня не разговаривать', done: true},
    {id: '', name: 'Посмотреть «Звёздные войны»', done: true},
    {id: '', name: 'Пройти какую-нибудь игру', done: true},
    {id: '', name: 'Посмотреть дом, в котором провёл детство', done: true},
    {id: '', name: 'Придумать песню на укулеле', done: false},
    {id: '', name: 'Научиться ездить на велосипеде без рук', done: true},
    {id: '', name: 'Принять участие в спортивных соревнованиях', done: false},
    {id: '', name: 'Принять участие в разработке приложения', done: false},
    {id: '', name: 'Прокатиться на мотоцикле', done: true},
    {id: '', name: 'Пройтись по улице с бумбоксом', done: false},
    {id: '', name: 'Прокатиться на сноуборде', done: true},
    {id: '', name: 'Освоить музыкальную программу и записать бит', done: false},
    {id: '', name: 'Научиться вязать', done: false},
    {id: '', name: 'Не брить бороду полгода', done: true}
  ];
  private wishList: Array<string> = [];

  constructor(
    private ls: LS
  ) { }

  createLSWishList() {
    this.wishes.forEach(function (item: Wish) {
      item.id = UUID.UUID();
      this.wishList.push(item.id);
      this.ls.setWish(item);
    }.bind(this));
    this.ls.setWishList(this.wishList);
  }

  getWishes(): Wish[] {
    this.createLSWishList();
    return this.wishes;
  }
}
