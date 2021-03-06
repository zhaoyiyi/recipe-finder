import { RecipeService } from './recipe.service';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ReflectiveInjector } from '@angular/core';
import 'rxjs/operator/skip';

describe('RecipeService', () => {
  const fakeRecipe = {
    url: '123',
    ingredientLines: ['apple', 'orange']
  };
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

  it('getRecipe() should query current service url', () => {
    this.recipeService.getRecipe('sushi');
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/.+api\.edamam\.com\/search.+/, 'url invalid');
  });

  it('getRecipe() should return some recipes with modified data structure', () => {
    this.recipeService.getRecipe('sushi');

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({
        hits: [{
          recipe: {
            'yield': 10,
            totalWeight: 123,
            totalDaily: {},
            totalNutrients: {},
            ingredientLines: ['100 ml water']
          }
        }]
      }),
    })));
    this.recipeService.searchResult.subscribe(
      (recipes) => {
        expect(recipes.length).toEqual(1, 'should contain given amount of recipes');
        expect(recipes[0].hasOwnProperty('perUnit')).toBe(true, 'should create perUnit property');
        expect(recipes[0].portion).toEqual(10, 'should set default portion to the value of yield');
        expect(recipes[0].perUnit.ingredients[0]).toEqual('10 ml water', 'should convert ingredients to per unit value');
        expect(recipes[0].perUnit.totalWeight).toEqual(12, 'should convert totalWeight to per unit value');
      }
    );
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
