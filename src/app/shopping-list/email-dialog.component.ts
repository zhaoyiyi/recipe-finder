import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-email-dialog',
  template: `
    <md-input-container>
      <input mdInput placeholder="Email" #email type="email">
    </md-input-container>
    <button md-button (click)="dialogRef.close(email.value)">Send</button>
  `,
  styles: []
})
export class EmailDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<EmailDialogComponent>) { }

  ngOnInit() {
  }

}
