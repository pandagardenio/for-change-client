import Leaflet from 'leaflet';
import React from 'react';

import { Marker, MarkerProps } from './Marker';

export type ClothingMarkerProps = MarkerProps;

export const ClothingMarker: React.FunctionComponent<ClothingMarkerProps> = (props: ClothingMarkerProps): JSX.Element => {
    return (
        <Marker icon={new Leaflet.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })} {...props}/>
    );
};
