import { useContext } from 'react';

import { PlaceCategoriesContext } from '../providers/PlaceCategoriesContext';
import { PlaceCategory } from '../sdk/models';

export const usePlaceCategories = (): PlaceCategory[] => {
    const context = useContext(PlaceCategoriesContext);
    if (!context) {
        throw new Error('Wrap your Component in a PlaceCategories Component');
    }
    return context;
};