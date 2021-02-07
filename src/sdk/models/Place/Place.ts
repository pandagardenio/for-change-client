import { PlaceCategorySlug } from "../PlaceCategory";

export type GroupedPlacesByCategory = Record<PlaceCategorySlug, Place[]>;

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
    categories: PlaceCategorySlug[];
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
