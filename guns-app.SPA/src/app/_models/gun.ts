import {Comment} from './comment';

export interface Gun {
    _id?: string,
    name: string;
    category: string;
    description: string;
    price: number;
    techs: Array<GunMap>;
    comments: Array<Comment>;
}

export interface GunMap{
    name: string;
    value: string;
}

