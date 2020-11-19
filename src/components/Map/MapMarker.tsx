import React from 'react';
import { Popup } from 'react-leaflet';

import { MarkerProps, Marker } from '../Marker';
import { Place } from '../../models/Place';

export type MapMarkerProps = Omit<MarkerProps, 'position'> & {
    place: Place;
}

export const MapMarker: React.FunctionComponent<MapMarkerProps> = (
    { place, ...rest }: MapMarkerProps
): JSX.Element => {
    return (
        <Marker {...rest} position={[place.location.lat, place.location.lng]}>
            <Popup>
                {place.name}
            </Popup>
        </Marker>
    );
};