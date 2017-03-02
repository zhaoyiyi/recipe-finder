import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailComponent } from './recipe-detail.component';
import { MaterialModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';

const recipeServiceStub = {
  currentRecipe: {
    ingredientLines: []
  },
  isInList() {
    return false;
  }
};

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
      ],
      declarations: [RecipeDetailComponent],
      providers: [{provide: RecipeService, useValue: recipeServiceStub}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
