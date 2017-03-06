import { RecipeService } from './recipe.service';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ReflectiveInjector } from '@angular/core';
import { Observable } from 'rxjs/Observable';

describe('RecipeService', () => {
  const fakeRecipe = {
    url: '123',
    ingredientLines: ['apple', 'orange']
  };
  beforeEach(() => {
    beforeEach(() => {
      this.injector = ReflectiveInjector.resolveAndCreate([
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        Http,
        RecipeService,
      ]);
      this.recipeService = this.injector.get(RecipeService);
      this.backend = this.injector.get(ConnectionBackend) as MockBackend;
      this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
    });
  });

  it('getRecipe() should query current service url', () => {
    this.recipeService.getRecipe('sushi');
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/.+api\.edamam\.com\/search.+/, 'url invalid');
  });

  it('getRecipe() should return some recipes', () => {
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({data: ['RECIPE_ONE', 'RECIPE_TWO']}),
    })));
    this.recipeService.getRecipe('sushi')
      .subscribe((recipes: String[]) => {
        expect(recipes.length).toEqual(2, 'should contain given amount of heroes');
        expect(recipes[0]).toEqual('RECIPE_ONE', ' RECIPE_ONE should be the first recipe');
        expect(recipes[1]).toEqual('RECIPE_TWO', ' RECIPE_TWO should be the second recipe');
        expect(this.recipeService.searchResult).toEqual(recipes, 'should update searchResult');
      });
  });

  it('getLastSearchResult() should return an observable', () => {
    expect(this.recipeService.getLastSearchResult() instanceof Observable).toBe(true);
  });


  it('addToShoppingList() should add new recipe to shopping list', () => {
    this.recipeService.addToShoppingList(fakeRecipe);
    const newRecipe = this.recipeService.shoppingList['123'];
    expect(newRecipe.ingredients.length).toEqual(2, 'recipe should be added to shopping list');
    expect(newRecipe.ingredients[0].name).toEqual('apple', 'first ingredient should be apple');
    expect(newRecipe.ingredients[0].isChecked).toBe(false, 'initialize isChecked as false');
  });

  it('removeFromShoppingList() should remove an item from shopping list', () => {
    this.recipeService.addToShoppingList(fakeRecipe);
    this.recipeService.removeFromShoppingList(fakeRecipe);
    expect(this.recipeService.shoppingList[fakeRecipe.url]).toBeUndefined('item should be removed from list');
  });

  it('isInList() checks whether a recipe is in list or not', () => {
    expect(this.recipeService.isInList(fakeRecipe)).toBe(false);

    this.recipeService.addToShoppingList(fakeRecipe);
    expect(this.recipeService.isInList(fakeRecipe)).toBe(true);
  });

  it('checkIngredient() toggles isChecked flag to an ingredient', () => {
    this.recipeService.addToShoppingList(fakeRecipe);
    const newRecipe = this.recipeService.shoppingList[fakeRecipe.url];
    expect(newRecipe.ingredients.length)
      .toEqual(fakeRecipe.ingredientLines.length, 'recipe is added to the list');

    this.recipeService.checkIngredient(fakeRecipe, 'apple');
    expect(newRecipe.ingredients.filter(ingred => ingred.isChecked === true)[0].name).toEqual('apple');
  });
});
