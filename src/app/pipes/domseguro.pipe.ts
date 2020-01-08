import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
