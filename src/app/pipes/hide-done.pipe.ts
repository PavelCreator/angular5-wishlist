import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideDone',
  pure: false
})
export class HideDonePipe implements PipeTransform {
  transform(items: any[], hideStatus: boolean): any {
    if (!items || !hideStatus) {
      return items;
    } else {
      return items.filter(item => !item.done);
    }
  }
}
