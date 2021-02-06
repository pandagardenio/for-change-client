import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Place } from '../../../sdk/models/Place';
import { theme } from '../../../utils/theme';
import { PlacesFilters } from './PlacesFilters';
import { LovedPlaces } from './LovedPlaces';
import { CityControls } from './CityControls';

export type PlacesControlsProps = {
    places: Place[];
    rawPlaces: Place[];
};

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative'
    },
    withMargin: {
        marginBottom: theme.spacing(4)
    },
    showMoreButton: {
        textTransform: 'none'
    }
}));

export const PlacesControls: React.FunctionComponent<PlacesControlsProps> = (): JSX.Element => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h6" component="h3">{t('places-controls.label.categories')}</Typography>
            <PlacesFilters className={classes.withMargin}/>
            <Typography variant="h6" component="h3">{t('places-controls.label.loved-places')}</Typography>
            <LovedPlaces className={classes.withMargin}/>
            <Typography variant="h6" component="h3">{t('places-controls.label.city-controls')}</Typography>
            <CityControls/>
        </div>
    );
};
