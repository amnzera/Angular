import {Restaurant} from './restaurant/restaurant.model';
import {MEAT_API} from "../app.api";
import {Injectable} from "@angular/core";
import {HttpClient ,HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";
import {MenuItemModel} from '../restaurant-detail/menu-item/menu-item.model';
import {decoratorArgument} from "codelyzer/util/astQuery";

@Injectable() // permite injetar funções do proprio angular no seu projeto...nesse caso é o serviço http do angular
export class RestaurantsService {


    constructor(private http: HttpClient) {}

    restaurants(search?: string): Observable<Restaurant[]> { // quem chamar essa func deve retornar um observable array tipo Restaurant...search? é opcional
        let params: HttpParams = undefined
        if(search) {
            params = new HttpParams().append('q', search)
        }
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params})
    }

    restaurantById(id: string): Observable<Restaurant>{ // pegando filtrado via ID
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
    }

    reviewsRestaurant(id:string): Observable<any>{ // retornando sem tipo definido apenas observable
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
    }
    menuRestaurant(id: string): Observable<MenuItemModel[]>{
        return this.http.get<MenuItemModel[]>(`${MEAT_API}/restaurants/${id}/menu`)
    }
}

// json-server db.json
