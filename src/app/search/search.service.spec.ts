import { SearchService } from './search.service';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ReflectiveInjector } from '@angular/core';
import { Observable } from 'rxjs/Observable';

describe('SearchService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      SearchService,
    ]);
    this.searchService = this.injector.get(SearchService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });


  it('getRecipe() should query current service url', () => {
    this.searchService.getRecipe('sushi');
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/.+api\.edamam\.com\/search.+/, 'url invalid');
  });

  it('getRecipe() should return some recipes', () => {
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({data: ['RECIPE_ONE', 'RECIPE_TWO']}),
    })));
    this.searchService.getRecipe('sushi')
      .subscribe((recipes: String[]) => {
        expect(recipes.length).toEqual(2, 'should contain given amount of heroes');
        expect(recipes[0]).toEqual('RECIPE_ONE', ' RECIPE_ONE should be the first recipe');
        expect(recipes[1]).toEqual('RECIPE_TWO', ' RECIPE_TWO should be the second recipe');
        expect(this.searchService.searchResult).toEqual(recipes, 'should update searchResult');
      });
  });

  it('getLastSearchResult() should return an observable', () => {
    expect(this.searchService.getLastSearchResult() instanceof Observable).toBe(true);
  });

});
