import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';

import { Place } from '../../../../sdk/models';
import { PlaceIcon } from '../../../PlaceIcon';

export type PlaceMarkerIconProps = {
    place: Place;
};

const useStyles = makeStyles((theme: Theme) => ({
    pin: {
        width: '30px',
        height: '30px',
        borderRadius: '50% 50% 50% 0',
        background: theme.palette.primary.main,
        position: 'absolute',
        transform: 'rotate(-45deg)',
        left: '50%',
        top: '50%',
        margin: '-15px 0 0 -15px',
        '&::after': {
            content: '',
            width: '24px',
            height: '24px',
            margin: '3px 0 0 3px',
            background: '#fff',
            position: 'absolute',
            borderRadius: '50%'
        }
    },
    icon: {
        position: 'absolute',
        width: '22px',
        fontSize: '22px',
        left: '0',
        right: '0',
        margin: '10px auto',
        textAlign: 'center',
        color: '#fff'
    }
}));

export const PlaceMarkerIcon: React.FunctionComponent<PlaceMarkerIconProps> = (
    { place, }: PlaceMarkerIconProps
): JSX.Element => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.pin}/>
            <div className={classes.icon}>
                <PlaceIcon placeCategorySlug={place.categories[0]}/>
            </div>
        </>
    );
};