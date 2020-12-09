import { OrderItem } from './orderitem';

export interface Basket
{
    orderItem: OrderItem[];
    total: string;
    discount: string;
    currencyCode: string;
}