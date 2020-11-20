import { Checkbox } from '@material-ui/core';
import React from 'react';

import { Place } from '../../../models/Place';

export type MapSearchOptionProps = {
    place: Place;
    selected: boolean;
}

export const MapSearchOption: React.FunctionComponent<MapSearchOptionProps> = (
    { place, selected }: MapSearchOptionProps
): JSX.Element => (
    <>
        <Checkbox
            style={{ marginRight: 8 }}
            checked={selected}
        />
        {place.name}
    </>
);