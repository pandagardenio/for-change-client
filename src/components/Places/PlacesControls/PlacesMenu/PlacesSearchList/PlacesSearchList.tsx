import { makeStyles, Theme, Chip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PlacesSearchListOption } from './PlacesSearchListOption';
import { Place } from '../../../../../sdk/models/Place';

export type PlacesSearchListProps = {
    applySelectedPlaces: () => void;
    className?: string;
    handleClose: () => void;
    onChangeSelectedPlaces: (places: Place[]) => void;
    places: Place[];
    searchQuery: string;
    selectedPlaces: Place[];
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '80vh'
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
        listStyle: 'none',
        padding: 0
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
        applySelectedPlaces, className, handleClose, onChangeSelectedPlaces, places, searchQuery, selectedPlaces
    }: PlacesSearchListProps
): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();

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
        if (searchQuery) {
            return places.filter((place: Place): boolean => new RegExp(searchQuery, 'i').test(place.name));
        }

        return places;
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
                    <li key={place.id}>
                        <PlacesSearchListOption onChange={handleChange} place={place} selected={isSelected(place)}/>
                    </li>
                ))}
            </ul>
            <footer className={classes.actions}>
                <Button
                    className={classes.actionsButton}
                    size="large"
                    fullWidth={true}
                    variant="outlined"
                    onClick={handleClose}
                >
                    {t('places.menu.actions.close')}
                </Button>
                <Button
                    className={classes.actionsButton}
                    size="large"
                    fullWidth={true}
                    variant="outlined"
                    onClick={applySelectedPlaces}
                >
                    {t('places.menu.actions.apply')}
                </Button>
            </footer>
        </section>
    );
};
