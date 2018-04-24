import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Wish } from '../interfaces/wish';
import { Constants } from '../services/constants.service';
import { LS } from '../services/local-storage.service';
import { UUID } from 'angular2-uuid';
import { ApiService } from '../api/api.service';
import { WishService } from '../wish/wish.service';

@Injectable()
export class BaseWishListService {
  private baseWishList: Wish[] = [];
  private baseWishIdList: Array<string> = [];

  constructor(
    private apiService: ApiService,
    private ls: LS
  ) { }

  uploadBaseWishListToLS(wishes) {
    wishes.forEach((item: Wish) => {
      this.baseWishIdList.push(item.id);
      this.ls.setWish(item);
    });
    this.ls.setWishIdList(this.baseWishIdList);
  }

  getBaseWishList(): Promise<Wish[]> {
    return new Promise<Wish[]>((resolve, reject) => {
      this.apiService.getBaseWishList()
        .then(function (wishes: Wish[]) {
          resolve(wishes);
        })
        .catch(function (error) {
          console.log('Error in apiService.getBaseWishList(): ', error);
        });
    });

  }
}

