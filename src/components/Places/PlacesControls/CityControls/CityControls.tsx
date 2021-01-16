import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setMap } from '../../../../store/actions/status';

const useStyles = makeStyles({
    root: {
        listStyle: 'none',
        padding: 0
    },
    button: {
        textTransform: 'none'
    }
});

export const CityControls: React.FunctionComponent = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleCityClick = (location: [number, number]) => (): void => {
        dispatch(setMap({
            center: location,
            zoom: 11
        }))
    };

    return (
        <ul className={classes.root}>
            <li>
                <Button
                    className={classes.button}
                    onClick={handleCityClick([40.385063, -3.700218])}
                    variant="text"
                >
                    Madrid
                </Button>
            </li>
        </ul>
    )
};