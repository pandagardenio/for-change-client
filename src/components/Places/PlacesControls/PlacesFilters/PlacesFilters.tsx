import { makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PlaceCategory } from '../../../../sdk/models';
import { getPlacesFilters } from '../../../../store/selectors/status';
import { setPlaceFilters } from '../../../../store/actions/status';
import { PlaceFilter } from './PlaceFilter';

export type PlacesFiltersValues = Record<PlaceCategory, boolean>;

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
    const placesFilters = useSelector(getPlacesFilters);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [fileCount, setFileCount] = useState(2);

    const handleOnChange = (key: string): () => void =>
    (): void => {
        const newPlacesFilters = {
            ...placesFilters,
            [key]: !placesFilters[key as PlaceCategory]
        };
        dispatch(setPlaceFilters(newPlacesFilters));
    };

    const handleMoreClick = (): void => {
        setFileCount(fileCount + 1);
    };

    const filterKeys = Object.keys(placesFilters);

    return (
        <ul className={`${className ? `${classes.list} ${className}` : classes.list}`}>
            {filterKeys.slice(0, 4 * fileCount - 1).map((key: string, i: number) => (
                <li className={classes.listItem} key={key}>
                    <PlaceFilter
                        onChange={handleOnChange(key)}
                        placeCategory={key as PlaceCategory}
                        selected={placesFilters[key as PlaceCategory]}
                    />
                </li>
            ))}
            {(fileCount * 4 < filterKeys.length) && (
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
