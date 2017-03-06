import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../shared/recipe.service';
import { Observable } from 'rxjs/Observable';

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
    
      <div class="hint" *ngIf="(recipeList | async)?.length <= 0">
        <h2>Search some recipes to start...</h2>
      </div>
    
      <div class="recipe-list" *ngIf="(recipeList | async)?.length > 0">
        <md-card class="recipe-card"
                 *ngFor="let recipe of (recipeList | async)">
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

  recipeList: Observable<any> = null;

  constructor( private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeList = this.recipeService.getLastSearchResult();
  }
  search(text: string) {
    this.recipeList = this.recipeService.getRecipe(text);
  }
  navigateToDetail(recipe) {
    this.recipeService.selectRecipe(recipe)
    this.router.navigate(['/recipe-detail']);
  }
}
