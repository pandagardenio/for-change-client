import { PlaceType } from "../models/Place";

export type PlaceListParams = {
    [PlaceType.ASSOCIATIONS]: boolean;
    [PlaceType.CLOTHING]: boolean;
    [PlaceType.EVENTS]: boolean;
    [PlaceType.GROCERIES]: boolean;
    [PlaceType.SHOPPING]: boolean;
    places: string[];
}
