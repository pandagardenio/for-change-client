import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React from 'react';

import { PlaceLogo as PlaceLogoModel } from '../../sdk/models/Place';

export type PlaceLogoProps = {
    logo: PlaceLogoModel;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            overflow: 'hidden',
            textAlign: 'center'
        },
        image: {
            height: theme.spacing(4)
        }
    })
);

export const PlaceLogo: React.FunctionComponent<PlaceLogoProps> = (
    { logo }: PlaceLogoProps
): JSX.Element => {
    const classes = useStyles();

    return (
        <figure className={classes.root}>
            <img className={classes.image} alt="" src={logo.sizes.thumbnail.url}/>
        </figure>
    )
}