import { PlaceDimension } from './PlaceDimension';
import { PlaceType } from "./PlaceType";

export type Place = {
    description: string;
    id: string;
    location: {
        lat: number;
        lng: number;
    };
    [PlaceDimension.ONLINE]: boolean;
    [PlaceDimension.PHYSICAL]: boolean;
    name: string;
    url: string;
    type: PlaceType;
}