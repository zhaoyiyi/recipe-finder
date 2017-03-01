import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/pluck';


const API_URL = 'https://api.edamam.com/search?app_id=fcfe9462&app_key=dc6cb1d3152df63f39cc2d023bbc20de';
@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  getRecipe(text: string) {
    return this.http.get(`${API_URL}&q=${text}`)
      .map(res => res.json())
      .pluck('hits');
  }

}
