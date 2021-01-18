import { makeStyles } from '@material-ui/core';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useSelector } from 'react-redux';

import { Place, PlaceShop } from '../../sdk/models/Place';
import { LocateControl } from './LocateControl';
import { MapMarker, MapMarkerProps } from './MapMarker';
import { getMapCenter, getMapZoom } from '../../store/selectors';
import { MapView } from './MapView';
import { FiltersControl } from './FiltersControl';

export type MapProps = {
    Marker?: React.FunctionComponent<MapMarkerProps>
    places: Place[];
};

const useStyles = makeStyles(() => ({
    leafletContainer: {
        height: '80vh',
        width: '100%'
    }
}));

export const Map: React.FunctionComponent<MapProps> = ({ places, Marker = MapMarker}: MapProps): JSX.Element => {
    const classes = useStyles();
    const mapCenter: [number, number] = useSelector(getMapCenter);
    const mapZoom = useSelector(getMapZoom);

    const physicalPlaces = places.filter((place: Place) => place.isPhysical);

    return (
        <>
            <MapContainer center={mapCenter} className={classes.leafletContainer} zoom={mapZoom} scrollWheelZoom={false}>
                <MapView/>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocateControl/>
                <FiltersControl/>
                {/*@ts-ignore*/}
                <MarkerClusterGroup>
                        {physicalPlaces
                            .filter((physicalPlace: Place) => !!physicalPlace.shops)
                            .map((place: Place, i: number) => {
                                return place.shops.map((shop: PlaceShop) => (
                                    <Marker key={i} place={place} shop={shop}/>
                                ));
                        })}
                </MarkerClusterGroup>
            </MapContainer>
        </>
    );
};