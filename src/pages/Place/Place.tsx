import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { Place as PlaceModel } from '../../sdk/models';
import { useSdk } from '../../sdk';
import { PlaceCard } from '../../components/PlaceCard';

export const Place: React.FunctionComponent = (): JSX.Element => {
    const sdk = useSdk();
    const { placeSlug } = useParams<{ placeSlug: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [place, setPlace] = useState<PlaceModel | null>(null);

    useEffect(() => {
        sdk.places.get(placeSlug)
            .then((fetchedPlace: PlaceModel) => {
                setPlace(fetchedPlace);
                setLoading(false);
            })
            .catch(() => { setLoading(false); });
    }, [placeSlug, sdk.places]);

    const notFound = !loading && !place;
    return (
        <Layout>
            <Container maxWidth="xl">
                {(loading) && (<div>Loading</div>)}
                {(!loading && place) && (<PlaceCard place={place}/>)}
                {(notFound) && (<div>Not found</div>)}
            </Container>
        </Layout>
    );
}