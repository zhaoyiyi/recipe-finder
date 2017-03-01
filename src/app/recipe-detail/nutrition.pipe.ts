import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nutrition'
})
export class NutritionPipe implements PipeTransform {

  transform(nutrient: any, args?: any): any {
    return nutrient ? `${Math.round(nutrient.quantity)} ${nutrient.unit}` : '';
  }

}
