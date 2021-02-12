import { Item } from "./item.interface";

export interface OrderItemBasket
{
    quantity: number;
    _id: string;
    item: Item;
    order: string;
}