import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Router } from '@angular/router';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService],
})
export class SearchComponent implements OnInit {

  recipeList: any = null;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
  }

  search(text: string) {
    this.recipeList = this.searchService.getRecipe(text);
  }

  navigateToDetail(recipe) {
    this.recipeService.currentRecipe = recipe;
    this.router.navigate(['/recipe-detail']);
  }

}
