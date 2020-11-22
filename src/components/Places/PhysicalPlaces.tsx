import React from 'react';

import { Place } from '../../sdk/models/Place';
import { Map } from '../Map';

export type PhysicalPlacesProps = {
    places: Place[];
}

export const PhysicalPlaces: React.FunctionComponent<PhysicalPlacesProps> = (
    { places }: PhysicalPlacesProps
): JSX.Element => {
    return (
        <Map places={places}/>
    );
};