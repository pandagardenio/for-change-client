import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';

import { getMapCenter, getMapZoom } from '../../../store/selectors';

export const MapView: React.FunctionComponent = (): JSX.Element => {
    const map = useMap();
    const mapCenter: [number, number] = useSelector(getMapCenter);
    const mapZoom = useSelector(getMapZoom);

    useEffect((): void => {
        map.setView(mapCenter, mapZoom);
    }, [map, mapCenter, mapZoom]);

    return (
        <></>
    );
}