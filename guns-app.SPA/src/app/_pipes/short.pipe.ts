import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short'
})
export class ShortPipe implements PipeTransform {

  transform(value: string): any {

    if(value.length > 7)
    {
      return value.slice(0,7) + '...';

    } else return value;
  }

}
