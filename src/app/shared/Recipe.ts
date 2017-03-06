export interface Recipe {
  portion: number;
  totalWeight: number;
  totalNutrients: Object;
  totalDaily: Object;
  url: string;
  ingredients: Array<any>;
}
