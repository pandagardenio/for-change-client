import React, { useEffect, useState } from 'react';

import { Layout } from '../../components/Layout';
import { Map } from '../../components/Map';
import { Place } from '../../sdk/models/Place';
import { useSdk } from '../../sdk';

export const Home: React.FunctionComponent = (): JSX.Element => {
    const [places, setPlaces] = useState<Place[]>([]);
    const sdk = useSdk();

    useEffect((): void => {
        sdk.places.all().then((places: Place[]) => { setPlaces(places); });
    }, [sdk.places]);

    return (
        <Layout>
            <Map places={places}/>
        </Layout>
    )
};