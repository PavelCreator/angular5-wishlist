import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Wish } from '../interfaces/wish';
import { LS } from '../services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from './api-urls.enum';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getBaseWishList(): Promise<any> {
    return this.http
      .get<Wish[]>(API_URLS.BaseWishList)
      .toPromise();
  }
}
