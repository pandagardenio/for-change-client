import React from 'react';

import { Place } from '../../../../sdk/models/Place';

export type PlacePopupDescriptionProps = {
    place: Place;
}

export const PlacePopupDescription: React.FunctionComponent<PlacePopupDescriptionProps> = (
    { place }: PlacePopupDescriptionProps
): JSX.Element => {
    return (
        <p>{place.description}</p>
    );
};