import React from 'react';

import { Layout } from '../../components/Layout';
import { Places } from '../../components/Places';
import { PlaceDimension } from '../../sdk/models';

export const PlacesPhysical: React.FunctionComponent = (): JSX.Element => {
    return (
        <Layout>
            <Places placeDimension={PlaceDimension.PHYSICAL}/>
        </Layout>
    )
};