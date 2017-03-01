import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent implements OnInit {
  @Input() totalWeight: number;
  @Input() totalNutrients;
  @Input() totalDaily;
  constructor() { }

  ngOnInit() {
  }

}
