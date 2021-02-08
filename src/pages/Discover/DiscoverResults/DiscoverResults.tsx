import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import { usePlaceCategory } from '../../../hooks';
import { PlaceCategorySlug, PlaceDimension } from '../../../sdk/models';
import { lightPlaceFilter } from '../../../store/actions';
import { Places } from '../../../components/Places';
import { AppRoutes } from '../../../components/Router';

export const DiscoverResults: React.FunctionComponent = (): JSX.Element => {
    const { placeCategorySlug } = useParams<{ placeCategorySlug: string }>();
    console.log(placeCategorySlug);
    const placeCategory = usePlaceCategory(placeCategorySlug as PlaceCategorySlug);
    console.log(placeCategory);
    const dispatch = useDispatch();

    useEffect(() => {
        placeCategory && dispatch(lightPlaceFilter(placeCategory.slug));
    }, [dispatch, placeCategory]);

    if (!placeCategory) {
        return (
            <Redirect to={AppRoutes.DISCOVER}/>
        );
    }

    return (
        <>
            <Places/>
            <Places placeDimension={PlaceDimension.ONLINE}/>
        </>
    );
};