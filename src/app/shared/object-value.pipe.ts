import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectValue'
})
export class ObjectValuePipe implements PipeTransform {

  transform(obj: any, args?: any): any {
    return Object.keys(obj).map(key => obj[key]);
  }
}
