class Order {
    constructor(public address: string, public number: number, public optional: string,
                public paymentOption: string, public orderItems: OrderItem[] = [], public id?: string) {}
}
class OrderItem {
    constructor(public quant: number, public menuId: string) {}
}
export {Order, OrderItem};