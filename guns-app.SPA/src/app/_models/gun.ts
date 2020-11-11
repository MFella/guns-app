export interface Gun {
    name: string;
    category: string;
    description: string;
    price: number;
    techs: Array<GunMap>;
}

export interface GunMap{
    name: string;
    value: string;
}
