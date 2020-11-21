import React from 'react';

import { Place } from '../../../../../sdk/models/Place';
import { PlaceDirections } from './PlaceDirections';
import { PlaceUrl } from './PlaceUrl';

export type PlacePopupActionsProps = {
    place: Place;
}

export const PlacePopupActions: React.FunctionComponent<PlacePopupActionsProps> = (
    { place }: PlacePopupActionsProps
): JSX.Element => {
    return (
        <footer>
            <div>
                {place.online && <PlaceUrl place={place}/>}
            </div>
            <div>
                {place.physical && <PlaceDirections place={place}/>}
            </div>
        </footer>
    )
};