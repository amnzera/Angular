import { Component, OnInit } from '@angular/core';
import {RestaurantsService} from '../restaurants/restaurants.service';
import {Restaurant} from '../restaurants/restaurant/restaurant.model';
import {ActivatedRoute} from '@angular/router';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  animations: [
      trigger('showDetail', [
          state('ready', style({opacity: 1 })),
          transition('void => ready', [
              style({opacity: 0, transform: 'translateX(20px)'}),
              animate('600ms 0s ease-in')
          ])
      ])
  ]
})
export class RestaurantDetailComponent implements OnInit {

    showDetail = 'ready';
    restaurant: Restaurant;

  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.restaurantsService.restaurantById(this.route.snapshot.params['id'])/*Chamando função restaurantID e passando info que recebeu da rota*/
    .subscribe(restaurant => this.restaurant = restaurant);
  }

}
