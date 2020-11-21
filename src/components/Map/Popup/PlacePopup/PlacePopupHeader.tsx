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
            <h3>{place.name}</h3>
        </header>
    )
};