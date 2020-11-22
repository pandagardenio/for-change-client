import { Typography } from '@material-ui/core';
import React from 'react';

import { Place } from '../../../../sdk/models/Place';

export type PlacePopupDescriptionProps = {
    place: Place;
}

export const PlacePopupDescription: React.FunctionComponent<PlacePopupDescriptionProps> = (
    { place }: PlacePopupDescriptionProps
): JSX.Element => {
    return (
        <Typography variant="body1">{place.description}</Typography>
    );
};