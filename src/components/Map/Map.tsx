import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { MapContainerProps } from 'react-leaflet/types/MapContainer';

import { Place, PlaceType } from '../../models/Place';
import { MapFilters, MapFiltersValues } from './MapFilters';
import { MapMarker, MapMarkerProps } from './MapMarker';
import { MapSearch } from './MapSearch';

import './Map.css'

export type MapProps = MapContainerProps & {
    Marker?: React.FunctionComponent<MapMarkerProps>
    places: Place[];
};

export type MapPlaceFiltersValues = {
    [PlaceType.CLOTHING]: boolean;
    [PlaceType.GROCERIES]: boolean;
}

export const Map: React.FunctionComponent<MapProps> = ({ Marker = MapMarker, ...rest}: MapProps): JSX.Element => {
    const [places, setPlaces] = useState(rest.places);
    const [mapFiltersValues, setMapFiltersValues] = useState({
        [PlaceType.CLOTHING]: true,
        [PlaceType.GROCERIES]: true
    });

    const filterPlaces = useCallback((placesToFilter: Place[]): Place[] => placesToFilter.filter((place: Place): boolean => {
        if (
            (place.type === PlaceType.CLOTHING && !mapFiltersValues.clothing) ||
            (place.type === PlaceType.GROCERIES && !mapFiltersValues.groceries)
        ) {
            return false;
        }

        return true;
    }), [mapFiltersValues]);

    const onMapFiltersChange = (mapFiltersValues: MapFiltersValues<MapPlaceFiltersValues>): void => {
        setMapFiltersValues(mapFiltersValues);
        setPlaces(filterPlaces(rest.places));
    };

    const onMapSearchSelect = (places: Place[]): void => {
        setPlaces(places.length ? places : filterPlaces(rest.places));
    }

    const initialMapFiltersValues = {
        [PlaceType.CLOTHING]: true,
        [PlaceType.GROCERIES]: true
    };

    useEffect((): void => {
        setPlaces(filterPlaces(rest.places));
    }, [rest.places, filterPlaces]);

    return (
        <>
            <MapSearch places={filterPlaces(rest.places)} onSelect={onMapSearchSelect}/>
            <MapFilters onChange={onMapFiltersChange} mapFiltersValues={initialMapFiltersValues}/>
            <MapContainer {...rest} center={[40.385063, -3.700218]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {places.map((place: Place, i: number) => <Marker key={i} place={place}/>)}
            </MapContainer>
        </>
    );
};