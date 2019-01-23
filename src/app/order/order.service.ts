import {Injectable} from '@angular/core';
import {ShoppingCartService} from '../restaurant-detail/shopping-cart/shopping-cart.service';
import {CartItemModel} from '../restaurant-detail/shopping-cart/cart-item.model';
import {Order} from './order.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MEAT_API} from '../app.api';


@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingCartService, private http: HttpClient) {}

    cartItems(): CartItemModel[] {
        return this.cartService.items;
    }

    increaseQty(item: CartItemModel) {
        this.cartService.increaseQty(item);
    }
    decreaseQty(item: CartItemModel) {
        this.cartService.decreaseQty(item);
    }
    remove(item: CartItemModel) {
        this.cartService.removeItem(item);
    }

    clear() {
        this.cartService.clear();
    }

    itemsValue(): number {
        return this.cartService.total();
    }
    // Finaliza a compra
    checkOrder(order: Order): Observable<string> {
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
            .pipe(map(order => order.id));
    }
    // Tambem tem a opção de declarar OBJ Order invés de string no retorno do Observable
}