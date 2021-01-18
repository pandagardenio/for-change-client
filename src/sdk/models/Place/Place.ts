import { PlaceCategory } from "./PlaceCategory";

export type GroupedPlacesByCategory = Record<PlaceCategory, Place[]>;

export type PlaceLogo = {
    sizes: {
        thumbnail: {
            url: string;
        };
        full: {
            url: string;
        };
    };
};

export type PlaceShop = {
    name: string;
    address: string;
    lat: number;
    lng: number;
}

export type PlaceLocation = {
    lat: number;
    lng: number;
}

export type Place = {
    id: number;
    description: string;
    isOnline: boolean;
    isPhysical: boolean;
    name: string;
    siteUrl: string;
    ecommerceUrl: string;
    category: PlaceCategory;
    slug: string;
    logo: PlaceLogo;
    isVerified: boolean;
    linkedin: string;
    facebook: string;
    instagram: string;
    vimeo: string;
    youtube: string;
    shops: PlaceShop[];
}

export const getGroupedPlacesByCategory = (places: Place[]): GroupedPlacesByCategory => {
    return places.reduce((groupedPlacesByType: Partial<GroupedPlacesByCategory>, place: Place): Partial<GroupedPlacesByCategory> => {
        let placesByPlaceCategory = groupedPlacesByType[place.category];

        if (!placesByPlaceCategory) {
            placesByPlaceCategory = [];
        }

        placesByPlaceCategory.push(place);

        return {
            ...groupedPlacesByType,
            [place.category]: placesByPlaceCategory
        }
    }, {}) as GroupedPlacesByCategory;
};
