import React, { useState, useEffect } from 'react';

import { PlaceCategoriesContext } from './PlaceCategoriesContext';
import { useSdk } from '../sdk';
import { PlaceCategory } from '../sdk/models';

export const PlaceCategoriesProvider: React.FunctionComponent = (
    { children }
): JSX.Element => {
    const sdk = useSdk();
    const [placeCategories, setPlaceCategories] = useState<PlaceCategory[]>([]);

    useEffect(() => {
        sdk.placeCategories.all().then((placeCategories: PlaceCategory[]) => {
            setPlaceCategories(placeCategories);
        });
    }, [sdk.placeCategories]);

    return (
        <PlaceCategoriesContext.Provider value={placeCategories}>
            {placeCategories && children}
        </PlaceCategoriesContext.Provider>
    )
}