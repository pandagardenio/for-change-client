import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Place, PlaceType, getGroupedPlacesByType } from '../../sdk/models/Place';
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

    const groupedPlacesByType = getGroupedPlacesByType(places);

    return (
        <>
            {Object.keys(groupedPlacesByType).map((placeType: string): JSX.Element => (
                <article key={placeType}>
                    <Typography variant="h4">{t(`place.type.${placeType}`)} ({groupedPlacesByType[placeType as PlaceType].length})</Typography>
                    <ul className={classes.root}>
                        {(groupedPlacesByType[placeType as PlaceType] as Place[]).map((place: Place) => (
                            <li className={classes.element} key={place.id}><PlaceCard place={place}/></li>
                        ))}
                    </ul>
                </article>
            ))}
        </>
    );
};