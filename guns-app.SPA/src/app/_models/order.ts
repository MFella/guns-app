import { OrderItem } from './orderitem';

export interface Order{
    _id: string;
    //status: string;
    startDate: string;
    endDate: string;
    discount: string;
    currencyCode: string;
    orderItem: OrderItem[];
    total: string;
}