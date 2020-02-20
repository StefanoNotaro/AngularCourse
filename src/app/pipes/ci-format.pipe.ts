import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ciFormat'
})
export class CiFormatPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {

    return value.substring(0, 1) + '.' + value.substring(1, 4) + '.' + value.substring(4, 7) + '-' + value.substring(7, value.length);
  }

}
