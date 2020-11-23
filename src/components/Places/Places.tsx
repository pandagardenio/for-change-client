import { Tab } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { theme } from '../../utils/theme';
import { Place, PlaceType } from '../../sdk/models/Place';
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
    const [value, setValue] = React.useState('1');
    const [placeTypeFiltersValues, setPlaceTypeFiltersValues] = useState({
        [PlaceType.CLOTHING]: true,
        [PlaceType.GROCERIES]: true
    });
    const [selectedPlaces, setSelectedPlaces] = React.useState<string[]>([]);

    const { t } = useTranslation();
    const sdk = useSdk();

    const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
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
                <TabContext value={value}>
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
                            <Tab label="Physical Places and Events" value="1" />
                            <Tab label="Online Places and Events" value="2" />
                        </TabList>
                    </header>
                    <TabPanel value="1" dir={theme.direction}>
                        <PhysicalPlaces places={places.filter((place: Place) => place.physical)}/>
                    </TabPanel>
                    <TabPanel value="2" dir={theme.direction}>
                        <OnlinePlaces places={places.filter((place: Place) => place.online)}/>
                    </TabPanel>
                </TabContext>
            </section>
        </>
    );
};