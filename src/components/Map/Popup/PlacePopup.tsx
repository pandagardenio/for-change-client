import { makeStyles, createStyles } from '@material-ui/core';
import React from 'react';

import { Popup, PopupProps } from './Popup';
import { Place } from '../../../sdk/models/Place';
import { PlaceCard } from '../../PlaceCard';

export type PlacePopupProps = Omit<PopupProps, 'children'> & {
    place: Place;
};

const useStyles = makeStyles(() =>
    createStyles({
        card: {
            boxShadow: 'none',
        }
    }),
);

export const PlacePopup: React.FunctionComponent<PlacePopupProps> = (
    { place }: PlacePopupProps
): JSX.Element => {
    const classes = useStyles();

    return (
        <Popup>
            <PlaceCard className={classes.card} place={place}/>
        </Popup>
    );
};