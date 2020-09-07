import { NominatedComponent } from './movie/nominated/nominated.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './reusable/filter/filter.component';
import { MovieItemComponent } from './movie/movie-list/movie-item/movie-item.component';
import { NominatedItemComponent } from './movie/nominated/nominated-item/nominated-item.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    MovieItemComponent,
    NominatedComponent,
    NominatedItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
