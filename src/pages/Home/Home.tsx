import React from 'react';

import { Layout } from '../../components/Layout';
import { Map } from '../../components/Map';
import { Place } from '../../models/Place/Place.js';
import places from '../../data/places.json';

export const Home: React.FunctionComponent = (): JSX.Element => {
    return (
        <Layout>
            <Map places={places as Place[]}/>
        </Layout>
    )
};