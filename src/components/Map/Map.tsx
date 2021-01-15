import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import { Place } from '../../sdk/models/Place';
import { LocateControl } from './LocateControl';
import { MapMarker, MapMarkerProps } from './MapMarker';

export type MapProps = {
    Marker?: React.FunctionComponent<MapMarkerProps>
    places: Place[];
};

const useStyles = makeStyles((theme: Theme) => ({
    leafletContainer: {
        height: '80vh',
        width: '100%'
    }
}));

export const Map: React.FunctionComponent<MapProps> = ({ places, Marker = MapMarker, ...rest}: MapProps): JSX.Element => {
    const classes = useStyles();
    const center: [number, number] = [40.385063, -3.700218];
    const zoom = 6;

    return (
        <>
            <MapContainer center={center} className={classes.leafletContainer} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocateControl/>
                {/*@ts-ignore*/}
                <MarkerClusterGroup>
                    {places.filter((place: Place) => {
                        return place.physical ?
                            place.location.lat &&
                            place.location.lat as number | '-' !== '-' &&
                            place.location.lng &&
                            place.location.lng as number | '-' !== '-' :
                            false
                    }).map((place: Place, i: number) => <Marker key={i} place={place}/>)}
                </MarkerClusterGroup>
            </MapContainer>
        </>
    );
};