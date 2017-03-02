import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService {
  currentRecipe: any;
  shoppingList: Object = {};

  constructor() { }

  addToShoppingList(recipe) {
    this.shoppingList[recipe.url] = recipe;
    console.log(this.shoppingList);
  }

  removeFromShoppingList(recipe) {
    delete this.shoppingList[recipe.url];
    console.log(this.shoppingList);
  }

  isInList(recipe) {
    return !!this.shoppingList[recipe.url];
  }
}
