import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LatLngBoundsTuple } from '../../../sdk/models';

export type FlyToBoundsProps = {
    bounds: LatLngBoundsTuple;
};

export const FlyToBounds: React.FunctionComponent<FlyToBoundsProps> = (
    { bounds }: FlyToBoundsProps
): JSX.Element => {
    const map = useMap();

    useEffect(() => {
        map.flyToBounds(bounds, {
            maxZoom: 14
        })
    }, [bounds, map]);

    return (
        <></>
    );
};