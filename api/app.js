const uuid = require('uuid/v4');

var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(request,response){
  console.log('get / route');
  response.send('Hello, Pasha');
});

const baseWishList = [
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
  {id: '', name: 'Не брить бороду полгода', done: true, edit: false}];

function assignIdToWish(wish) {
  wish.id = uuid();
  return wish;
}

app.get('/base-wish-list', function(request, response){
  console.log("Get base list");
  baseWishList.forEach(function (baseWish) {
    assignIdToWish(baseWish);
  });
  response.json(baseWishList);
});

app.listen(3001, function(){
  console.log("Listening on port 3001");
});
