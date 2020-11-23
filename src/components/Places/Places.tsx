import { Tab } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { theme } from '../../utils/theme';
import { Place, PlaceType, PlaceDimension } from '../../sdk/models/Place';
import { useSdk } from '../../sdk';
import { PhysicalPlaces } from './PhysicalPlaces';
import { OnlinePlaces } from './OnlinePlaces';
import { PlacesMenu } from './PlacesMenu';
import { PlacesSearch } from './PlacesSearch';
import { PlacesFilters, PlacesFiltersValues } from './PlacesFilters';
import { PlaceListParams } from '../../sdk/dto';

export type PlaceTypeFiltersValues = {
    [PlaceType.CLOTHING]: boolean;
    [PlaceType.GROCERIES]: boolean;
}

export const Places: React.FunctionComponent = (): JSX.Element => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [dimension, setDimension] = React.useState(PlaceDimension.PHYSICAL);
    const [placeTypeFiltersValues, setPlaceTypeFiltersValues] = useState({
        [PlaceType.CLOTHING]: true,
        [PlaceType.GROCERIES]: true
    });
    const [selectedPlaces, setSelectedPlaces] = React.useState<string[]>([]);

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

    const onPlaceTypeFilterChange = (mapFiltersValues: PlacesFiltersValues<PlaceTypeFiltersValues>): void => {
        setPlaceTypeFiltersValues(mapFiltersValues);
    };

    const onPlacesSearchSelect = (places: Place[]): void => {
        setSelectedPlaces(places.map((place: Place) => place.id));
    }

    useEffect((): void => {
        getPlaces({
            ...placeTypeFiltersValues,
            places: selectedPlaces
        })
        .then((places: Place[]) => { setPlaces(places); });
    }, [getPlaces, placeTypeFiltersValues, selectedPlaces]);

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
                        <TabList onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Physical Places and Events" value={PlaceDimension.PHYSICAL} />
                            <Tab label="Online Places and Events" value={PlaceDimension.ONLINE} />
                        </TabList>
                    </header>
                    <TabPanel value={PlaceDimension.PHYSICAL} dir={theme.direction}>
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