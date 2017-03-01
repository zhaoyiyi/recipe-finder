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
import { SearchService } from './search/search.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    RecipeDetailComponent,
    NutritionComponent,
    NutritionPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [RecipeService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
