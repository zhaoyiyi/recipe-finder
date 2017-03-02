import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListComponent } from './shopping-list.component';
import { MaterialModule } from '@angular/material';
import { RecipeService } from '../shared/recipe.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const recipeServiceStub = {
  shoppingList: {
    'fake1': {
      url: 'fake1',
      ingredients: [
        {name: 'apple', isChecked: false},
        {name: 'pen', isChecked: false},
      ]
    },
    'fake2': {
      url: 'fake2',
      ingredients: [
        {name: 'pineapple', isChecked: false},
        {name: 'pen', isChecked: false},
      ]
    }
  }
};

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ShoppingListComponent],
      providers: [
        {provide: RecipeService, useValue: recipeServiceStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getRecipes() should get an array of recipes', () => {
    expect(component.getRecipes() instanceof Array).toBe(true);
    expect(component.getRecipes().length).toEqual(Object.keys(recipeServiceStub.shoppingList).length);
  });

  it('getShoppingList() should return array of recipes with isChecked of ingredient to be false', () => {
    const check = () => {
      let isChecked = false;
      component.getShoppingList().forEach(recipe => {
        if (recipe.ingredients.filter(ingred => ingred.isChecked === true).length > 0) {
          isChecked = true;
        }
      });
      return isChecked;
    };
    expect(check()).toBe(false);
    expect(component.getShoppingList().length).toBeLessThanOrEqual(component.getRecipes().length);
  });
});
