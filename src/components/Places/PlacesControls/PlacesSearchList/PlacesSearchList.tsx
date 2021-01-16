import { makeStyles, Theme, Chip } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PlacesSearchListOption } from './PlacesSearchListOption';
import { Place } from '../../../../sdk/models/Place';
import { setSelectedPlaces } from '../../../../store/actions';
import { getSelectedPlaces } from '../../../../store/selectors/places';

export type PlacesSearchListProps = {
    className?: string;
    hideItems?: boolean;
    itemsToShow?: number;
    places: Place[];
    rawPlaces: Place[];
    searchQuery: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    actions: {
        display: 'flex'
    },
    actionsButton: {
        borderRadius: 0,
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        listStyle: 'none',
        padding: 0,
        textAlign: 'left'
    },
    listItem: {
        padding: `0 ${theme.spacing(1)}px`,
        width: '45%'
    },
    chipList: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    }
}));

export const PlacesSearchList: React.FunctionComponent<PlacesSearchListProps> = (
    {
        className, hideItems = true, itemsToShow = 8, places, rawPlaces, searchQuery
    }: PlacesSearchListProps
): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const selectedPlaces = useSelector(getSelectedPlaces);
    const onChangeSelectedPlaces = (changedSelectedPlaces: Place[]): void => {
        dispatch(setSelectedPlaces(changedSelectedPlaces));
    };

    const isSelected = (place: Place): boolean =>
        !!selectedPlaces.filter((placeToFilter: Place) => place.id === placeToFilter.id).length

    const handleChange = (place: Place, selected: boolean): void => {
        onChangeSelectedPlaces(
            selected ?
                [...selectedPlaces, place] :
                selectedPlaces.filter((placeToFilter: Place) => placeToFilter.id !== place.id)
        );
    };

    const deleteSelectedPlace = (place: Place): () => void => () => {
        onChangeSelectedPlaces(
            selectedPlaces.filter((placeToFilter: Place) => placeToFilter.id !== place.id)
        );
    };

    const getPlacesToRender = (): Place[] => {
        const placesToRender = searchQuery ?
            rawPlaces.filter((place: Place): boolean => new RegExp(searchQuery, 'i').test(place.name)) :
            rawPlaces;
        
        if (hideItems) {
            return placesToRender.slice(0, itemsToShow);
        }
       return placesToRender;
    };

    return (
        <section className={classes.root}>
            <header>
                <ul className={classes.chipList}>
                    {selectedPlaces.map((place: Place): JSX.Element => (
                        <li key={place.id}>
                            <Chip
                                label={place.name}
                                onDelete={deleteSelectedPlace(place)}
                                className={classes.chip}
                            />
                        </li>
                    ))}
                </ul>
            </header>
            <ul className={className ? `${className} ${classes.list}` : classes.list}>
                {getPlacesToRender().map((place: Place): JSX.Element => (
                    <li className={classes.listItem} key={place.id}>
                        <PlacesSearchListOption onChange={handleChange} place={place} selected={isSelected(place)}/>
                    </li>
                ))}
            </ul>
        </section>
    );
};
