import React from 'react';
import { Popup as LeafletPopup } from 'react-leaflet';
import { PopupProps as LeafletPopupProps } from 'react-leaflet/types/Popup';

export type PopupProps = LeafletPopupProps;

export const Popup: React.FunctionComponent<PopupProps> = (
    { children, ...rest }: PopupProps
): JSX.Element => {
    return (
        <LeafletPopup {...rest}>{children}</LeafletPopup>
    );
};