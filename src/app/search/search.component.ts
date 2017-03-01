import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Router } from '@angular/router';
import { RecipeService } from '../shared/recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  recipeList: Observable<any> = null;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    console.log('search init');
    this.recipeList = this.searchService.getLastSearchResult();
  }

  search(text: string) {
    this.recipeList = this.searchService.getRecipe(text);
  }

  navigateToDetail(recipe) {
    this.recipeService.currentRecipe = recipe;
    this.router.navigate(['/recipe-detail']);
  }

}
