import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';


@Component({
  selector: 'app-shopping-list',
  template: `
    <section class="hint" *ngIf="getRecipes().length < 1">
      <h2>Please go to search page and add something to shopping list first</h2>
    </section>

    <section class="shopping-list" *ngIf="getRecipes().length > 0">
      <md-tab-group class="recipes">
        <md-tab label="Selected Recipes">
          <md-list>
            <md-list-item *ngFor="let recipe of getRecipes()">
              <button (click)="onRecipeClick(recipe)" md-line md-button>{{ recipe.label }}</button>
              <button md-button (click)="onRemoveRecipe(recipe)"><md-icon>close</md-icon></button>
            </md-list-item>
          </md-list>
        </md-tab>
      </md-tab-group>
    
      <md-tab-group class="overview" [(selectedIndex)]="overviewIndex">
        <md-tab label="{{ selectedRecipe.label }} Ingredients" *ngIf="selectedRecipe">
          <p *ngFor="let ingred of selectedRecipe.ingredients">
            <md-checkbox md-line [checked]="ingred.isChecked" (click)="checkIngredient(ingred.name)">
              {{ ingred.name }}
            </md-checkbox>
          </p>
        </md-tab>
        <md-tab label="All Ingredients">
          <md-list>
            <template ngFor let-recipe [ngForOf]="getRecipes()">
              <h3 md-subheader>{{ recipe.label }}</h3>
              <md-list-item *ngFor="let ingred of recipe.ingredients">
                <p>{{ ingred.name }}</p>
              </md-list-item>
              <md-divider></md-divider>
            </template>
          </md-list>
        </md-tab>
    
        <md-tab label="Shopping List">
          <md-list>
            <template ngFor let-recipe [ngForOf]="getShoppingList()">
              <h3 md-subheader>{{ recipe.label }}</h3>
              <md-list-item *ngFor="let ingred of recipe.ingredients">
                <p>{{ ingred.name }}</p>
              </md-list-item>
              <md-divider></md-divider>
            </template>
          </md-list>
        </md-tab>
      </md-tab-group>
    </section>
    
    <app-shopping-actions *ngIf="getRecipes().length > 0"></app-shopping-actions>
  `,
  styles: [`
    .hint {
      text-align: center;
      color: grey;
    }
    .shopping-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      max-width: 1200px;
      margin: 0 auto;
    }
    .recipes {
      width: 400px;
    }
    .overview {
      width: 600px;
    }
    .overview p {
      padding: 0 1rem;
    }
    @media print {
      html, body, .shopping-list {
        height: 100%;
      }
      .overview {
        width: 100%;
        height: 100%;
      }
      .recipes {
        display: none;
      }
      .shopping-actions {
        display: none;
      }
    }
    @media screen {
      .overview, .recipes {
        max-height: 70vh;
      }
    }

  `]
})
export class ShoppingListComponent implements OnInit {

  recipes: Object = {};
  selectedRecipe: any = {};
  overviewIndex = 0;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.shoppingList;
    this.selectedRecipe = this.recipes[Object.keys(this.recipes)[0]];
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
  onRemoveRecipe(recipe) {
    this.recipeService.removeFromShoppingList(recipe);
  }

}
