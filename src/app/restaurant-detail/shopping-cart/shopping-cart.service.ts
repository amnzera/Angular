import {CartItemModel} from './cart-item.model';
import {MenuItemModel} from '../menu-item/menu-item.model';
import {Injectable} from '@angular/core';
import {NotificationService} from '../../shared/notification.service';

@Injectable()
export class ShoppingCartService {
    items: CartItemModel[] = [];

    constructor(private notificationService: NotificationService) {}

    clear() {
        this.items = [];
    }
    addItem(item: MenuItemModel) {
        let encontrarItem = this.items.find((mItem) => mItem.menuItem.id === item.id);
        if (encontrarItem) {
            this.increaseQty(encontrarItem); // ADD se já estiver no array
        } else {
            this.items.push(new CartItemModel(item)); // Se não estiver no Array adicione um novo OBJ
        }
        this.notificationService.notify(`Você adicionou o item ${item.name}`);
    }

    increaseQty(item: CartItemModel) {
        item.quantidade = item.quantidade + 1;
    }
    decreaseQty(item: CartItemModel) {
        item.quantidade = item.quantidade - 1;
        if(item.quantidade === 0){
            this.removeItem(item)
        }
    }

    removeItem(item: CartItemModel) {
        this.items.splice(this.items.indexOf(item), 1);
        this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`);
    }
    total(): number {
        return this.items.map(items => items.value()).reduce((prev, value) => prev + value, 0);
    }
}