import React from 'react';

import { PlaceMarkerProps, PlaceMarker } from './Marker';
import { PlacePopup } from './Popup';

export type MapMarkerProps = PlaceMarkerProps

export const MapMarker: React.FunctionComponent<MapMarkerProps> = (
    { place, shop, ...rest }: MapMarkerProps
): JSX.Element => {
    return (
        <PlaceMarker place={place} shop={shop} {...rest}>
            <PlacePopup place={place} shop={shop}/>
        </PlaceMarker>
    );
};