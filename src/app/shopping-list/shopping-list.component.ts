import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  recipes: Object = {};
  selectedRecipe: any = {};
  overviewIndex = 0;

  constructor(private recipeService: RecipeService) {

  }

  ngOnInit() {
    this.recipes = this.recipeService.shoppingList;
  }

  checkIngredient(ingredientName) {
    this.recipeService.checkIngredient(this.selectedRecipe, ingredientName);
  }

  getRecipes() {
    return Object.keys(this.recipes).map(key => this.recipes[key]);
  }

  getShoppingList() {
    return this.getRecipes()
      .map(recipe => {
        const ingredients = recipe.ingredients.filter(ingred => !ingred.isChecked);
        return Object.assign({}, recipe, {ingredients});
      });
  }

  onRecipeClick(recipe) {
    this.overviewIndex = 0;
    this.selectedRecipe = recipe;
  }

}
