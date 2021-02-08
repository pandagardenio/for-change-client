import { LatLngTuple } from "leaflet";

import { PlaceCategorySlug } from "../PlaceCategory";

export type GroupedPlacesByCategory = Record<PlaceCategorySlug, Place[]>;

export type LatLngBoundsTuple = [LatLngTuple, LatLngTuple];

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

export const seralizePlaceBounds = (bounds: LatLngBoundsTuple): string =>
    bounds.map((boundCorner: [number, number]) => boundCorner.join('_')).join('_');

export const deserializePlaceBounds = (seralizedBounds: string): LatLngBoundsTuple | null => {
    try {
        const latLngBoundsComponents = seralizedBounds
        .split('_').map((latLngBoundComponent: string ) => parseFloat(latLngBoundComponent));
        const latLngBounds: [LatLngTuple, LatLngTuple] = [
            [latLngBoundsComponents[0], latLngBoundsComponents[1]],
            [latLngBoundsComponents[2], latLngBoundsComponents[3]]
        ];

        if (
            !latLngBounds[0][0] || isNaN(latLngBounds[0][0]) ||
            !latLngBounds[0][1] || isNaN(latLngBounds[0][1]) ||
            !latLngBounds[1][0] || isNaN(latLngBounds[1][0]) ||
            !latLngBounds[1][1] ||isNaN(latLngBounds[1][1])
        ) {
            return null;
        }

        return latLngBounds;
    } catch (error) {
        return null;
    }
}