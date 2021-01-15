import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';

import { Place } from '../../../sdk/models/Place';
import { Map } from '../../Map';
import { PlacesSidebar } from '../../PlacesSidebar';

export type PhysicalPlacesProps = {
    places: Place[];
    rawPlaces: Place[];
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex'
    },
    sidebar: {
        background: theme.palette.background.default,
        boxShadow: '0px -2px 5px 0px rgb(222,222,222)',
        padding: theme.spacing(3),
        width: theme.spacing(96)
    }
}));

export const PhysicalPlaces: React.FunctionComponent<PhysicalPlacesProps> = (
    { places, rawPlaces }: PhysicalPlacesProps
): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <PlacesSidebar className={classes.sidebar} rawPlaces={rawPlaces} places={places}/>
            <Map places={places}/>
        </div>
    );
};