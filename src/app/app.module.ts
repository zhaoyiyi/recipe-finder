import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeService } from './shared/recipe.service';
import { NutritionComponent } from './recipe-detail/nutrition.component';
import { NutritionPipe } from './recipe-detail/nutrition.pipe';
import { BackButtonDirective } from './shared/back-button.directive';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingActionsComponent } from './shopping-list/shopping-actions.component';
import { EmailDialogComponent } from './shopping-list/email-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    RecipeDetailComponent,
    NutritionComponent,
    NutritionPipe,
    BackButtonDirective,
    ShoppingListComponent,
    ShoppingActionsComponent,
    EmailDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent],
  entryComponents: [EmailDialogComponent]
})
export class AppModule {
}
