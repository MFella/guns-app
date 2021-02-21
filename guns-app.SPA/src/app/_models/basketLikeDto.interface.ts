import { Basket } from "./basket";

export interface BasketLikeDto extends Basket
{
    discount_code: string;
}