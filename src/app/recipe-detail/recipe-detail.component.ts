import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';


@Component({
  selector: 'app-recipe-detail',
  template: `
    <a md-raised-button appBackButton>Back</a>
    <section class="recipe-detail">
      <md-card class="header">
        <img src="{{ recipe.image }}" alt="">
        <div>
          <h1>{{ recipe.label }}</h1>
          <a md-raised-button color="accent" href="{{ recipe.url }}" target="_blank">See Instructions on {{ recipe.source }}</a>
          <button md-raised-button (click)="addToShoppingList(recipe)" *ngIf="!isInShoppingList">Add to shopping list</button>
          <button md-raised-button (click)="addToShoppingList(recipe)" *ngIf="isInShoppingList">Remove from shopping list</button>
        </div>
      </md-card>
      <md-card class="ingredients">
        <md-list>
          <h3 md-subheader>{{ recipe.ingredientLines.length }} Ingredients</h3>
          <md-divider></md-divider>
          <md-list-item *ngFor="let ingred of recipe.ingredientLines">
            <p md-line> {{ ingred }} </p>
          </md-list-item>
        </md-list>
      </md-card>
      <app-nutrition
        [totalDaily]="recipe.totalDaily"
        [totalNutrients]="recipe.totalNutrients"
        [totalWeight]="recipe.totalWeight"
      ></app-nutrition>
    </section>
  `,
  styles: [`
    md-card {
      margin-bottom: 1rem;
    }
    a[appBackButton] {
      margin-bottom: 2rem;
    }
    .header {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
    }
    .header img {
    }
    .header button {
      display: block;
      margin: 2rem 0;
    }
    .recipe-detail {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      align-items: flex-start;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .ingredients {
      width: 400px;
    }
    .ingredients .mat-list .mat-list-item .mat-line {
      white-space: normal;
    }
  `]
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
