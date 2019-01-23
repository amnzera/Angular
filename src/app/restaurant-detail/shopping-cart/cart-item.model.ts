import {MenuItemModel} from '../menu-item/menu-item.model';

export class CartItemModel {
    constructor(public menuItem: MenuItemModel , public quantidade: number = 1 ) {}

    value(): number {
       return this.menuItem.price * this.quantidade;
    }
}