import { Tab } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';

import { theme } from '../../utils/theme';
import { Place } from '../../sdk/models/Place';
import { useSdk } from '../../sdk';
import { PhysicalPlaces } from './PhysicalPlaces';
import { OnlinePlaces } from './OnlinePlaces';

export const Places: React.FunctionComponent = (): JSX.Element => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [value, setValue] = React.useState('1');
    const sdk = useSdk();

    const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    useEffect((): void => {
        sdk.places.all().then((places: Place[]) => { setPlaces(places); });
    }, [sdk.places]);

    return (
        <>
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Physical Places and Events" value="1" />
                    <Tab label="Online Places and Events" value="2" />
                </TabList>
                <TabPanel value="1" dir={theme.direction}>
                    <PhysicalPlaces places={places.filter((place: Place) => place.physical)}/>
                </TabPanel>
                <TabPanel value="2" dir={theme.direction}>
                    <OnlinePlaces places={places.filter((place: Place) => place.online)}/>
                </TabPanel>
            </TabContext>
        </>
    );
};