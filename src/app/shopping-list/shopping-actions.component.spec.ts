import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingActionsComponent } from './shopping-actions.component';

describe('ShoppingActionsComponent', () => {
  let component: ShoppingActionsComponent;
  let fixture: ComponentFixture<ShoppingActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
