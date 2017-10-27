import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Wish } from '../entities/wish';
import { LS } from '../services/local-storage.service';

@Injectable()
export class DataMockService {
  private wishes: Wish[] = [
    {id: '', name: 'Забросить ботинки на провода', done: true, edit: false},
    {id: '', name: 'Прокатиться на крыше транспортного средства', done: true, edit: false},
    {id: '', name: 'Сделать настоящее тату', done: true, edit: false},
    {id: '', name: 'Научиться прыгать на скейте', done: false, edit: false},
    {id: '', name: 'Сыграть в казино', done: false, edit: false},
    {id: '', name: 'Сняться в рекламе', done: true, edit: false},
    {id: '', name: 'Три дня не разговаривать', done: true, edit: false},
    {id: '', name: 'Посмотреть «Звёздные войны»', done: true, edit: false},
    {id: '', name: 'Пройти какую-нибудь игру', done: true, edit: false},
    {id: '', name: 'Посмотреть дом, в котором провёл детство', done: true, edit: false},
    {id: '', name: 'Придумать песню на укулеле', done: false, edit: false},
    {id: '', name: 'Научиться ездить на велосипеде без рук', done: true, edit: false},
    {id: '', name: 'Принять участие в спортивных соревнованиях', done: false, edit: false},
    {id: '', name: 'Принять участие в разработке приложения', done: false, edit: false},
    {id: '', name: 'Прокатиться на мотоцикле', done: true, edit: false},
    {id: '', name: 'Пройтись по улице с бумбоксом', done: false, edit: false},
    {id: '', name: 'Прокатиться на сноуборде', done: true, edit: false},
    {id: '', name: 'Освоить музыкальную программу и записать бит', done: false, edit: false},
    {id: '', name: 'Научиться вязать', done: false, edit: false},
    {id: '', name: 'Не брить бороду полгода', done: true, edit: false}
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
