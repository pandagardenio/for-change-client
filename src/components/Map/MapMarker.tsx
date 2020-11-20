import React from 'react';
import { Popup } from 'react-leaflet';

import { PlaceMarkerProps, PlaceMarker } from './Marker';

export type MapMarkerProps = PlaceMarkerProps

export const MapMarker: React.FunctionComponent<MapMarkerProps> = (
    { place, ...rest }: MapMarkerProps
): JSX.Element => {
    return (
        <PlaceMarker place={place} {...rest}>
            <Popup>
                {place.name}
            </Popup>
        </PlaceMarker>
    );
};