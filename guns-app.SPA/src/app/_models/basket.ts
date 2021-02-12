import { OrderItem } from './orderitem';
import { OrderItemBasket } from './orderitembasket';

export interface Basket
{
    orderItem: OrderItemBasket[];
    total: string;
    discount: string;
    currencyCode: string;
}