import { makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import { Place, PlaceType } from '../../sdk/models/Place';
import { MapFilters, MapFiltersValues } from './MapFilters';
import { MapMarker, MapMarkerProps } from './MapMarker';
import { MapMenu } from './MapMenu';
import { MapSearch } from './MapSearch';

export type MapProps = {
    Marker?: React.FunctionComponent<MapMarkerProps>
    places: Place[];
};

export type PlaceTypeFiltersValues = {
    [PlaceType.CLOTHING]: boolean;
    [PlaceType.GROCERIES]: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        padding: theme.spacing(3)
    },
    leafletContainer: {
        height: theme.spacing(60),
        maxHeight: '80vh'
    }
}));

export const Map: React.FunctionComponent<MapProps> = ({ Marker = MapMarker, ...rest}: MapProps): JSX.Element => {
    const { t } = useTranslation();
    const [places, setPlaces] = useState(rest.places);

    const [placeTypeFiltersValues, setPlaceTypeFiltersValues] = useState({
        [PlaceType.CLOTHING]: true,
        [PlaceType.GROCERIES]: true
    });

    const filterPlaces = useCallback((placesToFilter: Place[]): Place[] => placesToFilter.filter((place: Place): boolean => {
        if (
            (place.type === PlaceType.CLOTHING && !placeTypeFiltersValues.clothing) ||
            (place.type === PlaceType.GROCERIES && !placeTypeFiltersValues.groceries)
        ) {
            return false;
        }

        return true;
    }), [placeTypeFiltersValues]);

    const onPlaceTypeFilterChange = (mapFiltersValues: MapFiltersValues<PlaceTypeFiltersValues>): void => {
        setPlaceTypeFiltersValues(mapFiltersValues);
        setPlaces(filterPlaces(rest.places));
    };

    const onMapSearchSelect = (places: Place[]): void => {
        setPlaces(places.length ? places : filterPlaces(rest.places));
    }

    const initialPlaceTypeFiltersValues = {
        [PlaceType.CLOTHING]: true,
        [PlaceType.GROCERIES]: true
    };

    const classes = useStyles();

    useEffect((): void => {
        setPlaces(filterPlaces(rest.places));
    }, [rest.places, filterPlaces]);

    return (
        <>
            <section>
                <header className={classes.header}>
                    <MapMenu>
                        <MapSearch places={filterPlaces(rest.places)} onSelect={onMapSearchSelect}/>
                        <MapFilters
                            mapFiltersValues={initialPlaceTypeFiltersValues}
                            onChange={onPlaceTypeFilterChange}
                            title={t('map.filters.title.place-type')}
                        />
                    </MapMenu>     
                </header>
                <MapContainer center={[40.385063, -3.700218]} className={classes.leafletContainer} zoom={6} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/*@ts-ignore*/}
                    <MarkerClusterGroup>
                        {places.map((place: Place, i: number) => <Marker key={i} place={place}/>)}
                    </MarkerClusterGroup>
                </MapContainer>
            </section>
        </>
    );
};