import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Place, PlaceCategory, getGroupedPlacesByCategory } from '../../sdk/models/Place';
import { PlaceCard } from '../PlaceCard';

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

    const groupedPlacesByType = getGroupedPlacesByCategory(places);

    return (
        <>
            {Object.keys(groupedPlacesByType).map((PlaceCategory: string): JSX.Element => (
                <article key={PlaceCategory}>
                    <Typography variant="h4">{t(`place.type.${PlaceCategory}`)} ({groupedPlacesByType[PlaceCategory as PlaceCategory].length})</Typography>
                    <ul className={classes.root}>
                        {(groupedPlacesByType[PlaceCategory as PlaceCategory] as Place[]).map((place: Place) => (
                            <li className={classes.element} key={place.slug}><PlaceCard place={place}/></li>
                        ))}
                    </ul>
                </article>
            ))}
        </>
    );
};