import { makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PlaceCategorySlug, PlaceCategory } from '../../../../sdk/models';
import { getPlacesFilters } from '../../../../store/selectors/status';
import { setPlaceFilters } from '../../../../store/actions/status';
import { PlaceFilter } from './PlaceFilter';
import { usePlaceCategories } from '../../../../hooks';

export type PlacesFiltersValues = Record<PlaceCategorySlug, boolean>;

export type PlacesFiltersProps = {
    className?: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        listStyle: 'none',
        padding: 0,
        margin: 'auto'
    },
    listItem: {
        margin: theme.spacing(2)
    }
}));

export const PlacesFilters: React.FunctionComponent<PlacesFiltersProps> = (
    { className }: PlacesFiltersProps
): JSX.Element => {
    const placeCategories = usePlaceCategories();
    const placesFilters = useSelector(getPlacesFilters);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [fileCount, setFileCount] = useState(2);

    const handleOnChange = (key: string): () => void =>
    (): void => {
        const newPlacesFilters = {
            ...placesFilters,
            [key]: !placesFilters[key as PlaceCategorySlug]
        };
        dispatch(setPlaceFilters(newPlacesFilters));
    };

    const handleMoreClick = (): void => {
        setFileCount(fileCount + 1);
    };

    const getPlaceCategories = (): PlaceCategory[] => placeCategories.filter(
        (placeCategory: PlaceCategory) => placeCategory.count
    );

    return (
        <ul className={`${className ? `${classes.list} ${className}` : classes.list}`}>
            {getPlaceCategories().slice(0, 4 * fileCount - 1).map((placeCategory: PlaceCategory, i: number) => (
                <li className={classes.listItem} key={placeCategory.slug}>
                    <PlaceFilter
                        onChange={handleOnChange(placeCategory.slug)}
                        placeCategorySlug={placeCategory.slug}
                        selected={placesFilters[placeCategory.slug]}
                    />
                </li>
            ))}
            {(fileCount * 4 < getPlaceCategories().length) && (
                <li className={classes.listItem}>
                    <PlaceFilter
                        onChange={handleMoreClick}
                        isMoreButton={true}
                    />
                </li>
            )}
        </ul>
    );
};
