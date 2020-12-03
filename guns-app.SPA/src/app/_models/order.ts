import { OrderItem } from './orderitem';

export interface Order{
    id: string;
    status: string;
    dateStart: string;
    dateEnd: string;
    discount: string;
    orderItems: OrderItem[];
}