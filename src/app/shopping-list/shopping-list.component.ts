import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shoppingList: Object = {};
  selectedRecipe: any = {};

  constructor(private recipeService: RecipeService) {

  }

  ngOnInit() {
    this.shoppingList = this.recipeService.shoppingList;
  }

  selectRecipe(recipe) {
    this.selectedRecipe = recipe;
  }


}
