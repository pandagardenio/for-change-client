import { PlaceDimension } from './PlaceDimension';
import { PlaceType } from "./PlaceType";

export type Place = {
    location: {
        lat: number;
        lng: number;
    };
    [PlaceDimension.ONLINE]: boolean;
    [PlaceDimension.PHYSICAL]: boolean;
    name: string;
    type: PlaceType;
}