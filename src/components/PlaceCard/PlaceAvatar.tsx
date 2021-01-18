import { makeStyles, Theme, createStyles, Avatar } from '@material-ui/core';
import React from 'react';

import { PlaceIcon } from '../PlaceIcon';
import { Place } from '../../sdk/models';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.primary.main
        }
    })
);

export type PlaceAvatarProps = {
    place: Place;
};

export const PlaceAvatar: React.FunctionComponent<PlaceAvatarProps> = (
    { place }: PlaceAvatarProps
): JSX.Element => {
    const classes = useStyles();

    return (
        <Avatar className={classes.root}><PlaceIcon placeCategory={place.category}/></Avatar>
    );
};