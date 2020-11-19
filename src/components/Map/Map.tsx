import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { MapContainerProps } from 'react-leaflet/types/MapContainer';

import { Place } from '../../models/Place';
import { MapMarker, MapMarkerProps } from './MapMarker';

import './Map.css'

export type MapProps = MapContainerProps & {
    Marker?: React.FunctionComponent<MapMarkerProps>
    places: Place[];
};

export const Map: React.FunctionComponent<MapProps> = ({ Marker = MapMarker, places, ...rest}: MapProps): JSX.Element => {
    return (
        <MapContainer {...rest} center={[40.385063, -3.700218]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {places.map((place: Place, i: number) => <Marker key={i} place={place}/>)}
        </MapContainer>
    );
};