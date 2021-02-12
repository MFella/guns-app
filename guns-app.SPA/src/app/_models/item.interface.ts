import { Tech } from "./tech.interface";

export interface Item {
    category: string;
    comments: Array<string>;
    description: string;
    name: string;
    price: string;
    techs: Array<Tech>
    _id: string;
}