import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fill'
})
export class FillPipe implements PipeTransform {

  transform(fillTimes: number): any {
    const numberOfTimes = Math.round(fillTimes);
    return (new Array(Math.round(numberOfTimes))).fill(1);
  }

}
