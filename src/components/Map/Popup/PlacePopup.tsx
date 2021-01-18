import { makeStyles, createStyles } from '@material-ui/core';
import React from 'react';

import { Popup, PopupProps } from './Popup';
import { Place, PlaceShop } from '../../../sdk/models/Place';
import { PlaceCard } from '../../PlaceCard';

export type PlacePopupProps = Omit<PopupProps, 'children'> & {
    place: Place;
    shop: PlaceShop;
};

const useStyles = makeStyles(() =>
    createStyles({
        card: {
            boxShadow: 'none',
        }
    }),
);

export const PlacePopup: React.FunctionComponent<PlacePopupProps> = (
    { place, shop }: PlacePopupProps
): JSX.Element => {
    const classes = useStyles();

    return (
        <Popup>
            <PlaceCard className={classes.card} place={place} shop={shop}/>
        </Popup>
    );
};