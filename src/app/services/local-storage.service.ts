import { Injectable } from '@angular/core';
import { Wish } from '../entities/wish';

@Injectable()
export class LS {

  constructor() { }

  clear() {
    localStorage.clear();
  }

  setWish(item: Wish) {
    localStorage.setItem(`W|${item.id}`, JSON.stringify(item));
  }

  getWish(id: string): Wish {
    let wishString = localStorage.getItem(`W|${id}`);
    if (wishString){
      return JSON.parse(wishString);
    } else {
      console.log(`Error: can't find wish with ID ${id}`);
    }
  }

  setWishList(wishList: Array<string>) {
    localStorage.setItem("wishes", JSON.stringify(wishList));
  }

  getWishListString(): string {
    return localStorage.getItem("wishes");
  }

  parseWishListString(wishListString: string): Wish[]{
    let wishList: Array<string> = JSON.parse(wishListString);
    let wishListWithData: Wish[] = [];

    wishList.forEach(function(id: String) {
      let wish = this.getWish(id);
      if (wish){
        wishListWithData.push(wish);
      }
    }.bind(this));
    return wishListWithData;
  }

}

