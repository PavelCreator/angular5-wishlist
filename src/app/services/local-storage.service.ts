import {Injectable} from '@angular/core';
import {Wish} from '../entities/wish';

@Injectable()
export class LS {

  constructor() {
  }

  clear() {
    localStorage.clear();
  }

  /*Wish*/
  setWish(item: Wish) {
    localStorage.setItem(`W|${item.id}`, JSON.stringify(item));
  }

  getWishString(id: string): string {
    let wishString = localStorage.getItem(`W|${id}`);
    if (wishString) {
      return wishString;
    } else {
      console.log(`Error: can't find wish with ID ${id} in LocalStorage`);
    }
  }

  getWish(id: string): Wish {
    return JSON.parse(this.getWishString(id));
  }

  parseWishString(wishString: string): Wish {
    return JSON.parse(wishString);
  }

  updateWish(wish: Wish) {
    localStorage.setItem(`W|${wish.id}`, JSON.stringify(wish));
  }

  addWish(newWish: Wish) {
    this.updateWish(newWish);
    let wishList: Array<string> = this.getWishList();
    wishList.push(newWish.id);
    this.setWishList(wishList);
  }

  deleteWish(id: string) {
    localStorage.removeItem(`W|${id}`);
    let wishList: Array<string> = this.getWishList();
    let index = wishList.indexOf(id);
    wishList.splice(index, 1);
    this.setWishList(wishList);
  }

  /*Wish list*/
  setWishList(wishList: Array<string>) {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }

  getWishListString(): string {
    let wishListString = localStorage.getItem(`wishList`);
    if (wishListString) {
      return wishListString;
    } else {
      console.log(`Error: can't find wishlist in LocalStorage`);
    }
  }

  getWishList(): Array<string> {
    return JSON.parse(this.getWishListString());
  }

  parseWishListString(wishListString: string): Wish[] {
    let wishList: Array<string> = JSON.parse(wishListString);
    let wishListWithData: Wish[] = [];

    wishList.forEach(function (id: String) {
      let wish = this.getWish(id);
      if (wish) {
        wishListWithData.push(wish);
      }
    }.bind(this));
    return wishListWithData;
  }

  sortList(wishes: Wish[]) {
    let wishList: Array<string> = [];
    console.log("wishes =", wishes);
    wishes.forEach(function (item: Wish) {
      wishList.push(item.id);
    });
    this.setWishList(wishList);
  }

}

