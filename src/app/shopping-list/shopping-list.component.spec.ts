import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListComponent } from './shopping-list.component';
import { MaterialModule } from '@angular/material';
import { RecipeService } from '../shared/recipe.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const recipeServiceStub = {
  shoppingList: {},
  checkIngredient() {}
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
      schemas: [ NO_ERRORS_SCHEMA ]
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
});
