import Leaflet from 'leaflet';
import React from 'react';

import { Marker, MarkerProps } from './Marker';

export type ClothingMarkerProps = MarkerProps;

export const ClothingMarker: React.FunctionComponent<ClothingMarkerProps> = (props: ClothingMarkerProps): JSX.Element => {
    return (
        <Marker icon={new Leaflet.Icon({
            iconUrl: "https://img.icons8.com/ios/344/socks.png"
        })} {...props}/>
    );
};