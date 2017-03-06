import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-search',
  template: `
    <section class="">
      <form (ngSubmit)="search(searchInput.value)" #searchForm="ngForm">
        <md-input-container>
          <input mdInput placeholder="find recipe here..." #searchInput>
        </md-input-container>
        <button md-raised-button type="submit">Search</button>
      </form>
    
      <div class="recipe-list">
        <md-card class="recipe-card"
                 *ngFor="let recipe of recipeList">
          <md-card-header>
            <md-card-title>{{recipe.label}}</md-card-title>
            <md-card-subtitle>{{recipe.source}}</md-card-subtitle>
          </md-card-header>
          <img md-card-image src="{{recipe.image}}" (click)="navigateToDetail(recipe)">
          <md-card-content>
            <md-chip-list>
              <md-chip *ngFor="let label of recipe.healthLabels">{{label}}</md-chip>
            </md-chip-list>
          </md-card-content>
        </md-card>
      </div>
    </section>
  `,
  styles: [`
    .recipe-list {
      display: flex;
      flex-flow: row wrap;
      align-items: flex-start;
      justify-content: space-around;
    }
    .recipe-card {
      width: 300px;
      margin: 0 1rem 1rem;
    }
    .recipe-card md-chip {
      margin: 0.25rem;
    }
    img:hover {
      cursor: pointer;
    }
    form {
      text-align: center;
      margin: 1rem;
    }
    .hint {
      color: grey;
      text-align: center;
    }
  `]
})
export class SearchComponent implements OnInit {

  recipeList;

  constructor( private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.searchResult.subscribe(
      result => {
        this.recipeList = result;
      }
    );
  }
  search(text: string) {
    this.recipeService.getRecipe(text);
  }
  navigateToDetail(recipe) {
    this.recipeService.selectRecipe(recipe);
    this.router.navigate(['/recipe-detail']);
  }
}
