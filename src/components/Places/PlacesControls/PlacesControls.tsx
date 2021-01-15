import { makeStyles, Typography, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PlacesSearch } from './PlacesSearch';
import { Place } from '../../../sdk/models/Place';
import { PlacesSearchList } from './PlacesSearchList';
import { PlacesFilters } from './PlacesFilters';
import { LovedPlaces } from './LovedPlaces';
import { theme } from '../../../utils/theme';

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

export const PlacesControls: React.FunctionComponent<PlacesControlsProps> = (
    { places, rawPlaces }: PlacesControlsProps
): JSX.Element => {
    const { t } = useTranslation();
    const [controlsState, setControlsState] = useState<{ hidePlaces: boolean, searchQuery: string }>({
        hidePlaces: true,
        searchQuery: ''
    });
    const classes = useStyles();

    const onSearchChange = (searchQuery: string): void => {
        setControlsState({
            ...controlsState,
            searchQuery
        });
    };

    const onShowMoreClick = (): void => {
        setControlsState({
            ...controlsState,
            hidePlaces: !controlsState.hidePlaces
        })
    };

    return (
        <div className={classes.root}>
            <PlacesSearch className={classes.withMargin} onChange={onSearchChange}/>
            <Typography variant="h6" component="h3">{t('places-controls.label.categories')}</Typography>
            <PlacesFilters className={classes.withMargin}/>
            <Typography variant="h6" component="h3">{t('places-controls.label.loved-places')}</Typography>
            <LovedPlaces className={classes.withMargin}/>
            <Typography variant="h6" component="h3">{t('places-controls.label.places')}</Typography>
            <PlacesSearchList
                hideItems={controlsState.hidePlaces}
                places={places}
                rawPlaces={rawPlaces}
                searchQuery={controlsState.searchQuery}
            />
            {controlsState.hidePlaces && (
                <Button
                    className={classes.showMoreButton}
                    color="secondary"
                    onClick={onShowMoreClick}
                    variant="text"
                >
                    {t('places-search-list.label.more')}
                </Button>
            )}
        </div>
    );
};
