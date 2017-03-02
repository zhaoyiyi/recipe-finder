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

  checkIngredient(recipe, ingredientName) {
    this.shoppingList[recipe.url].ingredients = this.shoppingList[recipe.url].ingredients
      .map(ingred => {
        if (ingred.name === ingredientName) {
          return {
            name: ingred.name,
            isChecked: !ingred.isChecked,
          };
        }
        return ingred;
      });
  }

  isInList(recipe) {
    return !!this.shoppingList[recipe.url];
  }
}
