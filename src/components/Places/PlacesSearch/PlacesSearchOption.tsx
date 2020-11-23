import { Checkbox } from '@material-ui/core';
import React from 'react';

import { Place } from '../../../sdk/models/Place';

export type PlacesSearchOptionProps = {
    place: Place;
    selected: boolean;
}

export const PlacesSearchOption: React.FunctionComponent<PlacesSearchOptionProps> = (
    { place, selected }: PlacesSearchOptionProps
): JSX.Element => (
    <>
        <Checkbox
            style={{ marginRight: 8 }}
            checked={selected}
        />
        {place.name}
    </>
);