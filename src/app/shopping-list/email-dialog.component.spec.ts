import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDialogComponent } from './email-dialog.component';
import { MaterialModule, MdDialogRef } from '@angular/material';

const mdDialogRefStub = {};

describe('EmailDialogComponent', () => {
  let component: EmailDialogComponent;
  let fixture: ComponentFixture<EmailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [EmailDialogComponent],
      providers: [
        {provide: MdDialogRef, useValue: mdDialogRefStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
