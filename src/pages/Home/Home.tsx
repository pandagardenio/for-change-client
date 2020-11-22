import React from 'react';

import { Layout } from '../../components/Layout';
import { Places } from '../../components/Places';
import { WhoWeAre } from './WhoWeAre';
import { WhatIsThis } from './WhatIsThis';

export const Home: React.FunctionComponent = (): JSX.Element => {
    return (
        <Layout>
            <Places/>
            <WhatIsThis/>
            <WhoWeAre/>
        </Layout>
    )
};