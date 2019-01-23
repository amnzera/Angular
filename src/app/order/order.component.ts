import { Component, OnInit } from '@angular/core';
import {RadioOption} from '../shared/radio/radio.option';
import {CartItemModel} from '../restaurant-detail/shopping-cart/cart-item.model';
import {OrderService} from './order.service';
import {Order, OrderItem} from './order.model';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

    emailPartern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    numberPartern = /^[0-9]*$/;

    orderForm: FormGroup;

    delivery = 8;

    orderId: string;

  paymentOptions: RadioOption[] = [
      {label: 'Dinheiro' , value: 'MON'},
      {label: 'Cartão de Débito' , value: 'DEB'},
      {label: 'Cartão Refeição' , value: 'REF'}
  ];

  constructor(private orderService: OrderService, private router: Router, private formBuilder: FormBuilder) { }
  // Dentro do Oninit ele esta atribuindo os dados do formulario ao orderForm
    // Blur não da o feedback imediato para o usuario
  ngOnInit() {
      this.orderForm = this.formBuilder.group({
         name: new FormControl ('', {
             validators: [Validators.required, Validators.minLength(5)],
             updateOn: 'blur'
         }),
         email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPartern)]),
         emailConfimation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPartern)]),
         address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
         number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPartern)]),
         optional: this.formBuilder.control(''),
         paymentOption: this.formBuilder.control('', [Validators.required])
      }, {validator: OrderComponent.equalsTo});
  }

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
      const email = group.get('email');
      const emailConfimation = group.get('emailConfimation');
      if (!email || !emailConfimation) {
          return undefined;
      }
      if (email.value !== emailConfimation.value) {
          return {emailsNotMatch: true};
      }
      return undefined;
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItemModel[] {
      return this.orderService.cartItems();
  }
  increaseQty(item: CartItemModel) {
    this.orderService.increaseQty(item);
  }
  decreaseQty(item: CartItemModel) {
    this.orderService.decreaseQty(item);
  }
  remove(item: CartItemModel) {
      this.orderService.remove(item);
  }

    isOrderCompleted() {
      return this.orderId !== undefined;
    }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map((item: CartItemModel) => new OrderItem(item.quantidade, item.menuItem.id)); // Organizando as info's no sub'OBJ
      this.orderService.checkOrder(order)
          .pipe(
            tap((orderId: string) => {
            this.orderId = orderId; // Guardando se foi finalizado a compra ou não
          })
          )

          .subscribe((orderId: string) => { // se order vier algum retorno as linhas abaixo serão executadas
          this.router.navigate(['/order-summary']); // Redireciona para outro Component
          this.orderService.clear();
      });
  }
}
