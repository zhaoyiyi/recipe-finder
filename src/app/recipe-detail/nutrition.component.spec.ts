import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionComponent } from './nutrition.component';
import { NutritionPipe } from './nutrition.pipe';
import { MaterialModule } from '@angular/material';

describe('NutritionComponent', () => {
  let component: NutritionComponent;
  let fixture: ComponentFixture<NutritionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [NutritionComponent, NutritionPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionComponent);
    component = fixture.componentInstance;
    component.totalDaily = {};
    component.totalNutrients = {};
    component.totalWeight = 456;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
