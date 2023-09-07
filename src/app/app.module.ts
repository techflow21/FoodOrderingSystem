import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
//import { UserListComponent } from './pages/user-list/user-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { AboutComponent } from './components/about/about.component';
import { BookTableComponent } from './components/book-table/book-table.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerService } from './shared/error-handler/error-handler.service';
import { FoodComponent } from './pages/dashboard/food/food.component';
import { CartComponent } from './pages/cart/cart.component';
import { SearchComponent } from './partials/search/search.component';
import { TagsComponent } from './partials/tags/tags.component';
import { TitleComponent } from './partials/title/title.component';
import { NotFoundComponent } from './partials/not-found/not-found.component';
import { AlertComponent } from './components/alert/alert.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ContactComponent,
    //UserListComponent,
    DashboardComponent,
    FooterComponent,
    ReservationsComponent,
    AboutComponent,
    BookTableComponent,
    NotFoundComponent,
    FoodComponent,
    CartComponent,
    SearchComponent,
    TagsComponent,
    TitleComponent,
    AlertComponent,
    CheckOutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //RatingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
