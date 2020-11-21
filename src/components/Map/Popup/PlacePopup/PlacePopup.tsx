import React from 'react';

import { Place, PlaceType } from '../../../../sdk/models/Place';
import { PopupProps } from '../Popup';
import { ClothingPopup } from './ClothingPopup';

export type PlacePopupProps = Omit<PopupProps, 'children'> & {
    place: Place;
};

const getPopupComponent = (place: Place): typeof PlacePopup => {
    switch (place.type) {
        case (PlaceType.CLOTHING):
            return ClothingPopup;
        default:
            return ClothingPopup;
    }
};

export const PlacePopup: React.FunctionComponent<PlacePopupProps> = (
    props: PlacePopupProps
): JSX.Element => {
    const PopupComponent = getPopupComponent(props.place);
    return (
        <PopupComponent {...props}/>
    );
};