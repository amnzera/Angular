// ATEN��O ESSE MODULO N�O � LAZY LOADING
// � apenas um modulo separado do MOD raiz
import {ModuleWithProviders, NgModule} from '@angular/core'; // Deixa op��o de carregar os services'providers' ou n�o
import {InputComponent} from './input/input.component';
import {RadioComponent} from './radio/radio.component';
import {RatingComponent} from './rating/rating.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ShoppingCartService} from '../restaurant-detail/shopping-cart/shopping-cart.service';
import {RestaurantsService} from '../restaurants/restaurants.service';
import {OrderService} from '../order/order.service';
import {SnackbarComponent} from './snackbar/snackbar.component';
import {NotificationService} from './notification.service';
import {LoginService} from '../security/login/login.service';
import {LoggedinGuard} from '../security/loggedin.guard';
import {LeaveOrderGuard} from '../order/leave-order.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../security/auth.interceptor';

@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent], // declara��o de componentes referente a esse MODULO
    imports: [FormsModule, ReactiveFormsModule, CommonModule], // Como � um novo modulo aparte tem que ser importado as fun��es usadas para os componentes
    exports: [InputComponent, RadioComponent, RatingComponent, FormsModule, ReactiveFormsModule, CommonModule, SnackbarComponent] // Exporta para o mudulo raiz
})
// Retorna os services para o meu modulo pricipal
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ShoppingCartService, LoginService, RestaurantsService, OrderService,
                        NotificationService, LoggedinGuard, LeaveOrderGuard,
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
        };
    }
}