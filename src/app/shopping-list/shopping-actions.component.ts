import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { EmailDialogComponent } from './email-dialog.component';

@Component({
  selector: 'app-shopping-actions',
  template: `
    <section class="shopping-actions">
      <button md-raised-button color="accent" (click)="onPrintList()">Print</button>
      <button md-raised-button (click)="sendEmail()">Email</button>
    </section>
  `,
  styles: [`
    .shopping-actions {
      text-align: center;
      margin: 2rem 0;
    }
    @media print {
      .shopping-actions {
        display: none;
      }
    }
  `]
})
export class ShoppingActionsComponent implements OnInit {
  email = '';

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  sendEmail() {
    const dialogRef = this.dialog.open(EmailDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.email = result;
    });
  }

  onPrintList() {
    window.print();
  }

}
