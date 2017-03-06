import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nutrition',
  template: `
    <md-card>
    <div class="nutrition">
      <h2>Nutrition Fact</h2>
      <p>per {{ servings }} serving ({{totalWeight * servings | number: '1.0-0'}}g)</p>
      <table class="nutrition-table">
        <tbody>
        <tr>
          <th class="thick-up-border thick-bottom-border">Amount</th>
          <th class="thick-up-border thick-bottom-border">% Daily Value</th>
        </tr>
        <tr>
          <td><span style="font-weight: bold;">Calories</span> {{totalNutrients.ENERC_KCAL | nutrition}}</td>
          <td></td>
        </tr>
        <tr>
          <td><span style="font-weight: bold;">Fat</span> {{totalNutrients.FAT | nutrition}}</td>
          <td>{{totalDaily.FAT | nutrition}}</td>
        </tr>
        <tr class="nutrition-subrow">
          <td>Saturated {{totalNutrients.FASAT | nutrition}} <br/> + Trans {{totalNutrients.FATRN | nutrition}}</td>
          <td>{{totalDaily.FASAT | nutrition}}</td>
        </tr>
        <tr>
          <td><span style="font-weight: bold;">Cholesterol</span> {{totalNutrients.CHOLE | nutrition}}</td>
          <td>{{totalDaily.CHOLE | nutrition}}</td>
        </tr>
        <tr>
          <td><span style="font-weight: bold;">Sodium</span> {{totalNutrients.NA | nutrition}}</td>
          <td>{{totalDaily.NA | nutrition}}</td>
        </tr>
        <tr>
          <td><span style="font-weight: bold;">Carbohydrate</span> {{totalNutrients.CHOCDF | nutrition}}</td>
          <td>{{totalDaily.CHOCDF | nutrition}}</td>
        </tr>
        <tr class="nutrition-subrow">
          <td>Fiber {{totalNutrients.FIBTG | nutrition}}</td>
          <td>{{totalDaily.FIBTG | nutrition}}</td>
        </tr>
        <tr class="nutrition-subrow">
          <td>Sugar {{totalNutrients.SUGAR | nutrition}}</td>
          <td></td>
        </tr>
        <tr>
          <td class="thick-bottom-border"><span style="font-weight: bold;">Protein</span> {{totalNutrients.PROCNT |
            nutrition}}
          </td>
          <td class="thick-bottom-border">{{totalDaily.PROCNT | nutrition}}</td>
        </tr>
  
        <tr>
          <td>Vitamin A</td>
          <td>{{totalDaily.VITA_RAE | nutrition}}</td>
        </tr>
        <tr>
          <td>Vitamin C</td>
          <td>{{totalDaily.VITC | nutrition}}</td>
        </tr>
        <tr>
          <td>Calcium</td>
          <td>{{totalDaily.CA | nutrition}}</td>
        </tr>
        <tr>
          <td>Iron</td>
          <td>{{totalDaily.FE | nutrition}}</td>
        </tr>
        </tbody>
      </table>
  
    </div>
  </md-card>
  `,
  styles: [`
    md-card {
      width: 350px;
    }
    .nutrition {
     }
    h2 {
      margin-bottom: 0;
    }
    p {
      margin: 0.25rem 0;
    }
    .nutrition-table {
      width: 100%;
      text-align: left;
      border-collapse: collapse;
    }
    .nutrition-table td, .nutrition-table th {
      border-bottom: 1px solid;
    }
    .nutrition-table td:last-child(2) {
      border-bottom: none;
    }
    .nutrition-table tr > td:nth-child(2),
    th:nth-child(2) {
      text-align: right;
    }
    .nutrition-subrow td {
      padding-left: 1rem;
    }
    .nutrition-table .thick-up-border {
      border-top-width: 3px;
    }
    .nutrition-table .thick-bottom-border {
      border-bottom-width: 2px;
    }
  `]
})
export class NutritionComponent implements OnInit {
  @Input() totalWeight: number;
  @Input() totalNutrients;
  @Input() totalDaily;
  @Input() servings: number;

  constructor() { }

  ngOnInit() { }
}
