import Leaflet from 'leaflet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Place } from '../../../../sdk/models/Place';
import { Marker, MarkerProps } from '../Marker';
import { PlaceMarkerIcon } from './PlaceMarkerIcon';

export type PlaceMarkerProps = Omit<MarkerProps, 'position'> & {
    place: Place;
};

export const PlaceMarker: React.FunctionComponent<PlaceMarkerProps> = (
    { place, ...rest }: PlaceMarkerProps
): JSX.Element => {
    return (
        <Marker
            {...rest}
            icon={new Leaflet.DivIcon({
                className: 'custom-div-icon',
                html: ReactDOMServer.renderToString(<PlaceMarkerIcon place={place}/>),
                iconSize: [30, 42],
                iconAnchor: [15, 42]
            })}
            position={[place.location.lat, place.location.lng]}
        />
    );
};