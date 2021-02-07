import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Place, PlaceCategorySlug } from '../../sdk/models';
import { PlaceCard } from '../PlaceCard';
import { PlacesSearch } from './PlacesControls';
import { useGroupedPlaces } from '../../hooks';

export type OnlinePlacesProps = {
    places: Place[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            listStyle: 'none',
            padding: 0
        },
        element: {
            margin: theme.spacing(1),
            width: theme.spacing(40)
        }
    }),
);

export const OnlinePlaces: React.FunctionComponent<OnlinePlacesProps> = (
    { places }: OnlinePlacesProps
): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [placesSearch, setPlacesSearch] = useState('');

    const handlePlacesSearchChange = (value: string): void => {
        setPlacesSearch(value);
    };

    const getPlacesToRender = (): Place[] => {
        if (!placesSearch) {
            return places;
        }
        return places.filter((place: Place) => place.name.indexOf(placesSearch) > -1);
    };

    const groupedPlacesByType = useGroupedPlaces(getPlacesToRender());

    return (
        <>
            <PlacesSearch onChange={handlePlacesSearchChange}/>
            {Object.keys(groupedPlacesByType).map((placeCategorySlug: string): JSX.Element => (
                <article key={placeCategorySlug}>
                    <Typography variant="h4">{t(`place.type.${placeCategorySlug}`)} ({groupedPlacesByType[placeCategorySlug as PlaceCategorySlug].length})</Typography>
                    <ul className={classes.root}>
                        {(groupedPlacesByType[placeCategorySlug as PlaceCategorySlug] || []).map((place: Place) => (
                            <li className={classes.element} key={place.slug}><PlaceCard place={place}/></li>
                        ))}
                    </ul>
                </article>
            ))}
        </>
    );
};