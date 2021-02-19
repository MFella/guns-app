import { OrderItemDto } from "./orderItemDto";

export interface OrderToSaveAll
{
    typeOfDelivery: string;
    typeOfPayment: string;
    orderItems: OrderItemDto[];
}