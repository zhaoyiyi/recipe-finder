import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RecipeService } from '../shared/recipe.service';
import { Router } from '@angular/router';

const recipeServiceStub = {
  getRecipe() {},
  searchResult: {
    subscribe() {},
  },
};
const routerStub = {
  navigate() {}
};

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MaterialModule],
      declarations: [SearchComponent],
      providers: [
        {provide: RecipeService, useValue: recipeServiceStub},
        {provide: Router, useValue: routerStub},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
