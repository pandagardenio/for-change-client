import { PlaceType } from "./PlaceType";

export type Place = {
    location: {
        lat: number;
        lng: number;
    };
    name: string;
    type: PlaceType;
}