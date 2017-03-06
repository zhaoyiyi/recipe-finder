import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from '../shared/Recipe';


@Component({
  selector: 'app-recipe-detail',
  template: `
    <a md-raised-button appBackButton>Back</a>
    <section class="recipe-detail" *ngIf="recipe">
      <md-card class="header">
        <img src="{{ recipe.image }}" alt="">
        <div>
          <h1>{{ recipe.label }}</h1>
          <a md-raised-button color="accent" href="{{ recipe.url }}" target="_blank">See Instructions on {{ recipe.source }}</a>
          
          <div *ngIf="!isInShoppingList">
            <button md-raised-button (click)="addToShoppingList(recipe)">Add to shopping list</button>
            <md-input-container>
              <input mdInput #portion type="number" [value]="recipe.portion" (change)="onPortionChange(portion.value)">
            </md-input-container>
            <md-checkbox class="example-margin" [(ngModel)]="useAdjusted">Use adjusted portion</md-checkbox>
          </div>
          
          <button md-raised-button (click)="addToShoppingList(recipe)" *ngIf="isInShoppingList">Remove from shopping list</button>
          
        </div>
      </md-card>
      
      <md-card class="ingredients">
        <md-list>
          <h3 md-subheader>Original Recipe, {{ recipe.ingredientLines.length }} Ingredients</h3>
          <md-divider></md-divider>
          <md-list-item *ngFor="let ingred of recipe.ingredientLines">
            <p md-line> {{ ingred }} </p>
          </md-list-item>
        </md-list>
      </md-card>
      
      <md-card class="ingredients" *ngIf="recipe.adjustedIngredients">
        <md-list>
          <h3 md-subheader>Adjusted Ingredients</h3>
          <md-divider></md-divider>
          <md-list-item *ngFor="let ingred of recipe.adjustedIngredients">
            <p md-line> {{ ingred }} </p>
          </md-list-item>
        </md-list>
      </md-card>
      
      <app-nutrition
        [servings]="recipe.portion"
        [totalDaily]="totalDaily"
        [totalNutrients]="totalNutrients"
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
      width: 350px;
    }
    .ingredients .mat-list .mat-list-item .mat-line {
      white-space: normal;
    }
  `]
})
export class RecipeDetailComponent implements OnInit {

  recipe: any;
  isInShoppingList: boolean;
  totalNutrients;
  totalDaily;
  useAdjusted = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.currentRecipe.subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
        this.totalNutrients = this.recipeService.getPerUnitValue(this.recipe.perUnit.totalNutrients, recipe.portion);
        this.totalDaily = this.recipeService.getPerUnitValue(this.recipe.perUnit.totalDaily, recipe.portion);
        this.isInShoppingList = this.recipeService.isInList(this.recipe);
      }
    );
  }

  addToShoppingList(recipe) {
    if (this.isInShoppingList) {
      this.recipeService.removeFromShoppingList(recipe);
    } else {
      this.recipeService.addToShoppingList(recipe, this.useAdjusted);
    }
    this.isInShoppingList = !this.isInShoppingList;
  }

  onPortionChange(portion: number) {
    this.recipeService.updatePortion(this.recipe, portion);
  }
}
