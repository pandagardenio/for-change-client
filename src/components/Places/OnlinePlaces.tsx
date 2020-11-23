import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Place, PlaceType } from '../../sdk/models/Place';
import { PlaceCard } from '../PlaceCard';

export type OnlinePlacesProps = {
    places: Place[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0
        },
        element: {
            margin: theme.spacing(1),
            width: theme.spacing(40)
        }
    }),
);

type GroupedPlacesByType = {
    [PlaceType.ASSOCIATIONS]?: Place[];
    [PlaceType.CLOTHING]?: Place[];
    [PlaceType.EVENTS]?: Place[];
    [PlaceType.GROCERIES]?: Place[];
    [PlaceType.SHOPPING]?: Place[];
}

export const OnlinePlaces: React.FunctionComponent<OnlinePlacesProps> = (
    { places }: OnlinePlacesProps
): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();

    const getGroupedPlacesByType = (): GroupedPlacesByType => {
        return places.reduce((groupedPlacesByType: GroupedPlacesByType, place: Place): Partial<GroupedPlacesByType> => {
            let placesByPlaceType = groupedPlacesByType[place.type];

            if (!placesByPlaceType) {
                placesByPlaceType = [];
            }

            placesByPlaceType.push(place);

            return {
                ...groupedPlacesByType,
                [place.type]: placesByPlaceType
            }
        }, {});
    };

    const groupedPlacesByType = getGroupedPlacesByType();

    return (
        <>
            {Object.keys(groupedPlacesByType).map((placeType: string): JSX.Element => (
                <>
                    <Typography variant="h4">{t(`place.type.${placeType}`)}</Typography>
                    <ul className={classes.root}>
                        {(groupedPlacesByType[placeType as PlaceType] as Place[]).map((place: Place) => <li className={classes.element}><PlaceCard place={place}/></li>)}
                    </ul>
                </>
            ))}
        </>
    );
};