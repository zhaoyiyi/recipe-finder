import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path: 'search', component: SearchComponent},
  {path: 'recipe-detail', component: RecipeDetailComponent},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: '', redirectTo: '/search', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
