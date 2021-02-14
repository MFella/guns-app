import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortprice'
})
export class ShortPricePipe implements PipeTransform {

  transform(value: string): any {

    console.log(value);

    const splitted = value.toString().split('.');

    if(splitted.length === 1)
    {
      return splitted[0] + '.00';
    }

    if(splitted[1].length === 2)
    {
      return value;
    }

    if(splitted[1].length > 2)
    {
      return splitted[0] + '.' + splitted[1][0] + splitted[1][1];
    } else //if (splitted[1].length === 1)
    {

      return splitted[0] + '.' + splitted[1][0] + '0';
    }

    //return null;
  }

}
