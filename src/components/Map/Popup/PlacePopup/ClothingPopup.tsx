import React from 'react';

import { Popup } from '../Popup';
import { PlacePopupProps } from './PlacePopup';
import { PlacePopupActions } from './PlacePopupActions';
import { PlacePopupHeader } from './PlacePopupHeader';
import { PlacePopupDescription } from './PlacePopupDescription';

export type ClothingPopupProps = Omit<PlacePopupProps, 'children'>;

export const ClothingPopup: React.FunctionComponent<ClothingPopupProps> = (
    { place, ...rest }: ClothingPopupProps
): JSX.Element => {
    return (
        <Popup {...rest}>
            <PlacePopupHeader place={place}/>
            <PlacePopupDescription place={place}/>
            <PlacePopupActions place={place}/>
        </Popup>
    );
};
