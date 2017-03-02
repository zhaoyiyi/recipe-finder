import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService {
  shoppingList: Object = {};
  currentRecipe: any;

  constructor() { }

  addToShoppingList(recipe) {
    recipe['ingredients'] = recipe.ingredientLines.map(ing => {
      return {
        name: ing,
        isChecked: false,
      };
    });
    this.shoppingList[recipe.url] = recipe;
  }

  removeFromShoppingList(recipe) {
    delete this.shoppingList[recipe.url];
  }

  isInList(recipe) {
    return !!this.shoppingList[recipe.url];
  }
}
