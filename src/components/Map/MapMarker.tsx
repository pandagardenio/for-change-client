import React from 'react';

import { PlaceMarkerProps, PlaceMarker } from './Marker';
import { PlacePopup } from './Popup';

export type MapMarkerProps = PlaceMarkerProps

export const MapMarker: React.FunctionComponent<MapMarkerProps> = (
    { place, ...rest }: MapMarkerProps
): JSX.Element => {
    return (
        <PlaceMarker place={place} {...rest}>
            <PlacePopup place={place}/>
        </PlaceMarker>
    );
};