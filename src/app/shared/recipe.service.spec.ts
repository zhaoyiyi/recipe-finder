import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let recipeService: RecipeService;
  const fakeRecipe = {
    url: '123',
    ingredientLines: ['apple', 'orange']
  };
  beforeEach(() => {
    recipeService = new RecipeService();
  });

  it('addToShoppingList() should add new recipe to shopping list', () => {
    recipeService.addToShoppingList(fakeRecipe);
    const newRecipe = recipeService.shoppingList['123'];
    expect(newRecipe.ingredients.length).toEqual(2, 'recipe should be added to shopping list');
    expect(newRecipe.ingredients[0].name).toEqual('apple', 'first ingredient should be apple');
    expect(newRecipe.ingredients[0].isChecked).toBe(false, 'initialize isChecked as false');
  });

  it('removeFromShoppingList() should remove an item from shopping list', () => {
    recipeService.addToShoppingList(fakeRecipe);
    recipeService.removeFromShoppingList(fakeRecipe);
    expect(recipeService.shoppingList[fakeRecipe.url]).toBeUndefined('item should be removed from list');
  });

  it('isInList() checks whether a recipe is in list or not', () => {
    expect(recipeService.isInList(fakeRecipe)).toBe(false);

    recipeService.addToShoppingList(fakeRecipe);
    expect(recipeService.isInList(fakeRecipe)).toBe(true);
  });

  it('checkIngredient() toggles isChecked flag to an ingredient', () => {
    recipeService.addToShoppingList(fakeRecipe);
    const newRecipe = recipeService.shoppingList[fakeRecipe.url];
    expect(newRecipe.ingredients.length)
      .toEqual(fakeRecipe.ingredientLines.length, 'recipe is added to the list');

    recipeService.checkIngredient(fakeRecipe, 'apple');
    expect(newRecipe.ingredients.filter(ingred => ingred.isChecked === true)[0].name).toEqual('apple');
  });
});
