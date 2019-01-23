import { BrowserModule } from '@angular/platform-browser';
import {NgModule, LOCALE_ID, ErrorHandler} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import {ROUTES} from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common'; // coloca Hash automatico..para que não tenha erro de navegação
import { LoginComponent } from './security/login/login.component';
import { UserDetailComponent } from './header/user-detail/user-detail.component';
import {ApplicationErrorHandler} from './app.error-handler';
import  locatePt from '@angular/common/locales/pt';

registerLocaleData(locatePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
    NotFoundComponent,
    LoginComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SharedModule.forRoot(),
    ReactiveFormsModule,            //Pre carregamento dos módulos futuros\/
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}) // constante Routes sendo Passado para uma função do angular
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, {provide: LOCALE_ID, useValue: 'pt'}, {provide: ErrorHandler, useClass: ApplicationErrorHandler}], // servico declarado na lista
  bootstrap: [AppComponent]
})
export class AppModule { }
