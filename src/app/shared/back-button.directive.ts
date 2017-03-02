import { Directive, HostListener, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
@Directive({
  selector: '[appBackButton]'
})
export class BackButtonDirective {

  constructor(private location: Location) {
  }

  @HostListener('mousedown') onMouseDown() {
    this.location.back();
  }


}
