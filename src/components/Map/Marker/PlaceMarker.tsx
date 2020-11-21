import React from 'react';

import { Marker, MarkerProps } from './Marker';
import { Place, PlaceType } from '../../../sdk/models/Place';
import { ClothingMarker } from './ClothingMarker';

export type PlaceMarkerProps = Omit<MarkerProps, 'position'> & {
    place: Place;
};

const getMarkerComponent = (place: Place): typeof Marker => {
    switch (place.type) {
        case (PlaceType.CLOTHING):
            return ClothingMarker
        default:
            return Marker;
    }
};

export const PlaceMarker: React.FunctionComponent<PlaceMarkerProps> = (
    { place, ...rest }: PlaceMarkerProps
): JSX.Element => {
    const MarkerComponent = getMarkerComponent(place);
    return (
        <MarkerComponent {...rest} position={[place.location.lat, place.location.lng]}/>
    );
};