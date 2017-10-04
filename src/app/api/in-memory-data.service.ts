import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let wishes = [
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
    ];
    return {wishes};
  }
}
