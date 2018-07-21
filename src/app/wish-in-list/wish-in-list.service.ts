import {ElementRef, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';

import {Wish} from '../interfaces/wish';
import {Constants} from '../services/constants.service';
import {LS} from '../services/local-storage.service';
import {ApiService} from '../api/api.service';

@Injectable()
export class WishInListService {
  private mode = Constants.Modes.Guest;
  private wishes: Wish[] = [];
  public editWishMode = false;
  public closeWishInListEditModes: Subject<number> = new Subject<number>();

  private diffWidthMin = 253;
  private widthBonus = 21;
  private heightBonus = 21;
  private heightBonusOver = 31;

  constructor(
    private apiService: ApiService,
    private ls: LS
  ) { }

  toggleWishStatus(id: string): Promise<Wish[]> {
    console.log('toggleStatus');
    return new Promise<Wish[]>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          for (let i = 0; i < this.wishes.length; i++) {
            const wish = this.wishes[i];
            console.log('wish =', wish);
            if (wish.id === id) {
              wish.done = !wish.done;
              this.ls.updateWish(wish);
              break;
            }
          }
          resolve(this.wishes);
          break;

        case Constants.Modes.User:
          break;
      }
    });
  }

  deleteWish(wish: Wish): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          this.wishes = this.wishes.filter(w => w !== wish);
          this.ls.deleteWish(wish.id);
          resolve();
          break;

        case Constants.Modes.User:
          break;
      }
    });
  }

  changeWishField(wish: Wish, field: string, value: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      switch (this.mode) {
        case Constants.Modes.Guest:
          const _wish = this.ls.getWish(wish.id);
          _wish[field] = value;
          this.ls.updateWish(_wish);
          resolve();
          break;

        case Constants.Modes.User:
          break;
      }
    });
  }

  calcWidthDiff(nameText: ElementRef, row: ElementRef): number {
    return row.nativeElement.offsetWidth - nameText.nativeElement.offsetWidth;
  }

  setInputWidth(nameText: ElementRef, row: ElementRef): number {
    const rowWidth = row.nativeElement.offsetWidth,
      nameTextWidth = nameText.nativeElement.offsetWidth,
      diffWidth = this.calcWidthDiff(nameText, row);

    return diffWidth > this.diffWidthMin ? nameTextWidth + this.widthBonus : rowWidth - this.diffWidthMin;
  }

  setInputHeight(nameText: ElementRef, row: ElementRef): number {
    const nameTextHeight = nameText.nativeElement.offsetHeight,
      diffWidth = this.calcWidthDiff(nameText, row);
    console.log(diffWidth > this.diffWidthMin ? nameTextHeight + this.heightBonus : nameTextHeight + this.heightBonusOver);
    return diffWidth > this.diffWidthMin ? nameTextHeight + this.heightBonus : nameTextHeight + this.heightBonusOver;
  }

  nameRegexValidation(event, regex: RegExp, characterReplacement: string): void {
    const target = event.target,
      cursorPosition = target.selectionStart - 1;

    if (target.value.search(regex) !== -1) {
      target.value = target.value.replace(regex, characterReplacement);
      target.selectionStart = target.selectionEnd = cursorPosition;
    }
  }

}

