import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React from 'react';

import { Place } from '../../sdk/models/Place';
import { PlaceCard } from '../PlaceCard';

export type OnlinePlacesProps = {
    places: Place[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0
        },
        element: {
            width: theme.spacing(40)
        }
    }),
);

export const OnlinePlaces: React.FunctionComponent<OnlinePlacesProps> = (
    { places }: OnlinePlacesProps
): JSX.Element => {
    const classes = useStyles();

    return (
        <>
        <ul className={classes.root}>
            {places.map((place: Place) => <li className={classes.element}><PlaceCard place={place}/></li>)}
        </ul>
        </>
    );
};