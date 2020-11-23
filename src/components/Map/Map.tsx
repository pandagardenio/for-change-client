import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import { Place } from '../../sdk/models/Place';
import { MapMarker, MapMarkerProps } from './MapMarker';

export type MapProps = {
    Marker?: React.FunctionComponent<MapMarkerProps>
    places: Place[];
};

const useStyles = makeStyles((theme: Theme) => ({
    leafletContainer: {
        height: theme.spacing(60),
        maxHeight: '80vh'
    }
}));

export const Map: React.FunctionComponent<MapProps> = ({ places, Marker = MapMarker, ...rest}: MapProps): JSX.Element => {
    const classes = useStyles();

    return (
        <>
            <section>
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