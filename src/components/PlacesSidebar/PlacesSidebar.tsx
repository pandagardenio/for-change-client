import { makeStyles, Theme, Container } from '@material-ui/core';
import React from 'react';

import { Place } from '../../sdk/models/Place';
import { PlacesControls } from '../Places';

export type PlacesSidebarProps = {
    className?: string;
    places: Place[];
    rawPlaces: Place[];
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        paddingTop: theme.spacing(3)
    },
    root: {
        padding: `${theme.spacing(3)}px 0`,
        overflow: 'auto'
    }
}));

export const PlacesSidebar: React.FunctionComponent<PlacesSidebarProps> = (
    { className, places, rawPlaces }: PlacesSidebarProps
): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={className ? `${className} ${classes.root}` : classes.root}>
            <Container className={classes.container} maxWidth="xl">
                <PlacesControls
                    places={places}
                    rawPlaces={rawPlaces}
                />
            </Container>
        </div>
    )
}