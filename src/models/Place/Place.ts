import { PlaceType } from "./PlaceType";

export type Place = {
    location: {
        lat: number;
        lng: number;
    };
    isOnline: boolean;
    isPhysical: boolean;
    name: string;
    type: PlaceType;
}