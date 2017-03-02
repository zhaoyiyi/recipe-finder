import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: any;
  isInShoppingList: boolean;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipe = this.recipeService.currentRecipe;
    this.isInShoppingList = this.recipeService.isInList(this.recipe);
  }

  addToShoppingList(recipe) {
    if (this.isInShoppingList) {
      this.recipeService.removeFromShoppingList(recipe);
    } else {
      this.recipeService.addToShoppingList(recipe);
    }
    this.isInShoppingList = !this.isInShoppingList;
  }

}
