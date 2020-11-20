import React from 'react';

import { Marker as LeafletMarker } from 'react-leaflet';
import { MarkerProps as LeafletMarkerProps } from 'react-leaflet/types/Marker';

export type MarkerProps = LeafletMarkerProps;

export const Marker: React.FunctionComponent<MarkerProps> = (props: MarkerProps): JSX.Element => {
    return (
        <LeafletMarker {...props}/>
    );
};