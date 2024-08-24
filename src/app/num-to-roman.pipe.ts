import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numToRoman',
  standalone: true
})
export class NumToRomanPipe implements PipeTransform {

  transform(value: any): string {
    if (isNaN(value) || value < 1 || value > 3999) {
      return ''
    }
    else {
      const romanNums = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
      const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
      let roman = '';
      for (let i = 0; i < romanNums.length; i++) {
        while (value >= values[i]) {
          roman += romanNums[i];
          value -= values[i]
        }
      }
      return roman;
    }
  }

}
