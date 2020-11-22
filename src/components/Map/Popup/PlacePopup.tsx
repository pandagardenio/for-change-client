import React from 'react';

import { Popup, PopupProps } from './Popup';
import { Place } from '../../../sdk/models/Place';
import { PlaceCard } from '../../PlaceCard';

export type PlacePopupProps = Omit<PopupProps, 'children'> & {
    place: Place;
};
export const PlacePopup: React.FunctionComponent<PlacePopupProps> = (
    { place }: PlacePopupProps
): JSX.Element => {
    return (
        <Popup>
            <PlaceCard place={place}/>
        </Popup>
    );
};