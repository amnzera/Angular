import { Component, OnInit } from '@angular/core';
import {Restaurant} from './restaurant/restaurant.model';
import {RestaurantsService} from "./restaurants.service";
import {trigger, state, style, transition, animate} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable ,from} from 'rxjs';
import {switchMap, tap, filter, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators';


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
      trigger('toggleSearch', [
          state('hidden', style({
              opacity: 0,
              "max-height": "0px"
          })),
          state('visible', style({
              opacity: 1,
              "max-height": "70px",
              "margin-top": "20px"
          })),
          transition('* => *', animate('200ms 0s ease-in-out')),
      ])
  ]
})
export class RestaurantsComponent implements OnInit {

    restaurants: Restaurant[];
    statusPesquisa = 'hidden';

    searchForm: FormGroup;
    searchControl: FormControl;

  constructor(private restaurantsService: RestaurantsService , private formBuilder: FormBuilder) { }

  ngOnInit() {
      // Pega infomações do formulario
      this.searchControl = this.formBuilder.control('');
      this.searchForm = this.formBuilder.group({
          searchControl: this.searchControl
      })
      // Passa info para o serviço... 'pesquisa'
      this.searchControl.valueChanges
          .pipe(
             debounceTime(500), // Atrasa o request em 500ms para cada mudança de valor no search
             distinctUntilChanged(), // Se o valores forem iguais dentro do tempo delay do debounceTime o request não é solicitado
             switchMap(searchTerm => this.restaurantsService.restaurants(searchTerm)
                     .pipe(catchError(error => from([])))) // Subscreve o observable para que ele busque de qualquer jeito com o backend
          ).subscribe(restaurants => this.restaurants = restaurants);

      this.restaurantsService.restaurants().subscribe(restaurants => this.restaurants = restaurants);
  }

  changePesquisa() {
      this.statusPesquisa = this.statusPesquisa === 'hidden' ? 'visible' : 'hidden';
  }

}