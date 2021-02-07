import { createContext } from 'react';

import { PlaceCategory } from '../sdk/models';

export const PlaceCategoriesContext = createContext<PlaceCategory[]>([]);