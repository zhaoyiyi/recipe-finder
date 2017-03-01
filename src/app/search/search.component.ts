import { Component, OnInit } from "@angular/core";
import { SearchService } from "./search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService],
})
export class SearchComponent implements OnInit {

  recipeList: any = null;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  search(text: string) {
    this.recipeList = this.searchService.getRecipe(text);
  }

}
