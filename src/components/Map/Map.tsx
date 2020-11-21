import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { MapContainerProps } from 'react-leaflet/types/MapContainer';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import { Place, PlaceType } from '../../models/Place';
import { MapFilters, MapFiltersValues } from './MapFilters';
import { MapMarker, MapMarkerProps } from './MapMarker';
import { MapSearch } from './MapSearch';

import './Map.css'
import { PlaceDimension } from '../../models/Place/PlaceDimension';

export type MapProps = MapContainerProps & {
    Marker?: React.FunctionComponent<MapMarkerProps>
    places: Place[];
};

export type PlaceDimensionFiltersValues = {
    [PlaceDimension.ONLINE]: boolean;
    [PlaceDimension.PHYSICAL]: boolean;
}

export type PlaceTypeFiltersValues = {
    [PlaceType.CLOTHING]: boolean;
    [PlaceType.GROCERIES]: boolean;
}

export const Map: React.FunctionComponent<MapProps> = ({ Marker = MapMarker, ...rest}: MapProps): JSX.Element => {
    const [places, setPlaces] = useState(rest.places);
    const [placeDimensionFiltersValues, setPlaceDimensionFiltersValues] = useState({
        [PlaceDimension.ONLINE]: true,
        [PlaceDimension.PHYSICAL]: true
    });
    const [placeTypeFiltersValues, setPlaceTypeFiltersValues] = useState({
        [PlaceType.CLOTHING]: true,
        [PlaceType.GROCERIES]: true
    });
    const showPlaceDimensionFilter = useCallback(
        (place: Place, filter: PlaceDimension): boolean =>
            place[filter] && placeDimensionFiltersValues[filter]
    , [placeDimensionFiltersValues]);

    const filterPlaces = useCallback((placesToFilter: Place[]): Place[] => placesToFilter.filter((place: Place): boolean => {
        if (
            (place.type === PlaceType.CLOTHING && !placeTypeFiltersValues.clothing) ||
            (place.type === PlaceType.GROCERIES && !placeTypeFiltersValues.groceries)
        ) {
            return false;
        }

        if (
            place.online &&
            !showPlaceDimensionFilter(place, PlaceDimension.ONLINE) &&
            !showPlaceDimensionFilter(place, PlaceDimension.PHYSICAL)
        ) {
            return false;
        }

        if (
            place.physical &&
            !showPlaceDimensionFilter(place, PlaceDimension.PHYSICAL) &&
            !showPlaceDimensionFilter(place, PlaceDimension.ONLINE)
        ) {
            return false;
        }

        if (
            !showPlaceDimensionFilter(place, PlaceDimension.PHYSICAL) &&
            !showPlaceDimensionFilter(place, PlaceDimension.ONLINE)
        ) {
            return false;
        }

        return true;
    }), [placeTypeFiltersValues, showPlaceDimensionFilter]);

    const onPlaceTypeFilterChange = (mapFiltersValues: MapFiltersValues<PlaceTypeFiltersValues>): void => {
        setPlaceTypeFiltersValues(mapFiltersValues);
        setPlaces(filterPlaces(rest.places));
    };

    const onPlaceDimensionFilterChange = (mapFiltersValues: MapFiltersValues<PlaceDimensionFiltersValues>): void => {
        setPlaceDimensionFiltersValues(mapFiltersValues);
        setPlaces(filterPlaces(rest.places));
    };

    const onMapSearchSelect = (places: Place[]): void => {
        setPlaces(places.length ? places : filterPlaces(rest.places));
    }

    const initialPlaceTypeFiltersValues = {
        [PlaceType.CLOTHING]: true,
        [PlaceType.GROCERIES]: true
    };

    const initialPlaceDimensionFiltersValues = {
        [PlaceDimension.ONLINE]: true,
        [PlaceDimension.PHYSICAL]: true
    };

    useEffect((): void => {
        setPlaces(filterPlaces(rest.places));
    }, [rest.places, filterPlaces]);

    return (
        <>
            <MapSearch places={filterPlaces(rest.places)} onSelect={onMapSearchSelect}/>
            <MapFilters onChange={onPlaceDimensionFilterChange} mapFiltersValues={initialPlaceDimensionFiltersValues}/>
            <MapFilters onChange={onPlaceTypeFilterChange} mapFiltersValues={initialPlaceTypeFiltersValues}/>
            <MapContainer {...rest} center={[40.385063, -3.700218]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/*@ts-ignore*/}
                <MarkerClusterGroup>
                    {places.map((place: Place, i: number) => <Marker key={i} place={place}/>)}
                </MarkerClusterGroup>
            </MapContainer>
        </>
    );
};