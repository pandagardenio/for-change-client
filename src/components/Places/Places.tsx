import { Tab, makeStyles, Theme, FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { theme } from '../../utils/theme';
import { Place, PlaceType, PlaceDimension } from '../../sdk/models/Place';
import { useSdk } from '../../sdk';
import { PhysicalPlaces } from './PhysicalPlaces';
import { OnlinePlaces } from './OnlinePlaces';
import { PlacesMenu } from './PlacesMenu';
import { PlacesSearch } from './PlacesSearch';
import { PlacesFilters, PlacesFiltersValues } from './PlacesFilters';
import { PlaceListParams } from '../../sdk/dto';
import { getLovedPlaces } from '../../store/selectors';

export type PlaceTypeFiltersValues = {
    [PlaceType.CLOTHING]: boolean;
    [PlaceType.GROCERIES]: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: `${theme.spacing(3)}px 0`
    }
}));

export const Places: React.FunctionComponent = (): JSX.Element => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [dimension, setDimension] = React.useState(PlaceDimension.PHYSICAL);
    const [placeTypeFiltersValues, setPlaceTypeFiltersValues] = useState({
        [PlaceType.CLOTHING]: true,
        [PlaceType.GROCERIES]: true
    });
    const [selectedPlaces, setSelectedPlaces] = React.useState<string[]>([]);
    const [showOnlyLovedPlaces, setShowOnlyLovedPlaces] = React.useState<boolean>(false);
    const lovedPlaces = useSelector(getLovedPlaces);

    const { t } = useTranslation();
    const sdk = useSdk();

    const handleChange = (_event: React.ChangeEvent<{}>, newDimension: string) => {
        setDimension(newDimension as PlaceDimension);
    };

    const getPlaces = useCallback(
        (placeListParams?: Partial<PlaceListParams>): Promise<Place[]> =>
            sdk.places.all(placeListParams),
        [sdk.places]
    );

    const onShowOnlyLovedPlacesChange = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
        setShowOnlyLovedPlaces(checked);
    };

    const onPlaceTypeFilterChange = (mapFiltersValues: PlacesFiltersValues<PlaceTypeFiltersValues>): void => {
        setPlaceTypeFiltersValues(mapFiltersValues);
    };

    const onPlacesSearchSelect = (places: Place[]): void => {
        setSelectedPlaces(places.map((place: Place) => place.id));
    }

    const classes = useStyles();

    useEffect((): void => {
        if (showOnlyLovedPlaces) {
            setPlaces(lovedPlaces);
        } else {
            getPlaces({
                ...placeTypeFiltersValues,
                places: selectedPlaces
            })
            .then((places: Place[]) => { setPlaces(places); });
        }
    }, [getPlaces, lovedPlaces, placeTypeFiltersValues, selectedPlaces, showOnlyLovedPlaces]);

    return (
        <>
            <section>
                <TabContext value={dimension}>
                    <header>
                        <PlacesMenu>
                            <PlacesSearch places={places} onSelect={onPlacesSearchSelect}/>
                            <PlacesFilters
                                placesFiltersValues={placeTypeFiltersValues}
                                onChange={onPlaceTypeFilterChange}
                                title={t('places.filters.title.place-type')}
                            />
                        </PlacesMenu>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={showOnlyLovedPlaces} onChange={onShowOnlyLovedPlacesChange}/>}
                                label={t(`places.filters.labels.loved`)}
                            />
                        </FormGroup>
                        <TabList onChange={handleChange} aria-label="simple tabs example">
                            <Tab label={t('places.filters.dimensions.physical')} value={PlaceDimension.PHYSICAL} />
                            <Tab label={t('places.filters.dimensions.online')} value={PlaceDimension.ONLINE} />
                        </TabList>
                    </header>
                    <TabPanel classes={classes} value={PlaceDimension.PHYSICAL} dir={theme.direction}>
                        <PhysicalPlaces places={places.filter((place: Place) => place.physical)}/>
                    </TabPanel>
                    <TabPanel value={PlaceDimension.ONLINE} dir={theme.direction}>
                        <OnlinePlaces places={places.filter((place: Place) => place.online)}/>
                    </TabPanel>
                </TabContext>
            </section>
        </>
    );
};
