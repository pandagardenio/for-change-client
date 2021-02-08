import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { Layout } from '../../../components/Layout';
import { AppRoutes } from '../../../components/Router';
import { Places } from '../../../components/Places';
import { deserializePlaceBounds } from '../../../sdk/models';

export const SearchResults: React.FunctionComponent = (): JSX.Element => {
    const { bounds } = useParams<{ bounds: string }>();
    const latLngBounds = deserializePlaceBounds(bounds);

    if (!latLngBounds) {
        return (
            <Redirect to={AppRoutes.SEARCH_INDEX}/>
        );
    }

    return (
        <Layout>
            <Places bounds={latLngBounds}/>
        </Layout>
    )
};