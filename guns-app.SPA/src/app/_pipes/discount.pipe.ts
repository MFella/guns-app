import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: string): string {

    let transformed = Math.round(parseFloat(value)*100);
    return transformed + '%';
    
  }

}
