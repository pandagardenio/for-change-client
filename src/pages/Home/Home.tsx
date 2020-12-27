import React from 'react';

import { Layout } from '../../components/Layout';
import { JoinUs } from './JoinUs';
import { WhatWeDo } from './WhatWeDo';
import { Hero } from './Hero';

export const Home: React.FunctionComponent = (): JSX.Element => {
    return (
        <Layout>
            <Hero/>
            <WhatWeDo/>
            <JoinUs/>
        </Layout>
    )
};