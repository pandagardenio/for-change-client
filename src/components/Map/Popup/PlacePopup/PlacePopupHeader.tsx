import { Typography } from '@material-ui/core';
import React from 'react';

import { Place } from '../../../../sdk/models/Place';

export type PlacePopupHeaderProps = {
    place: Place;
}

export const PlacePopupHeader: React.FunctionComponent<PlacePopupHeaderProps> = (
    { place }: PlacePopupHeaderProps
): JSX.Element => {
    return (
        <header>
            <Typography variant="h5">{place.name}</Typography>
        </header>
    )
};