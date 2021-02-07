import { makeStyles, Theme, createStyles, Avatar } from '@material-ui/core';
import React from 'react';

import { PlaceIcon } from '../PlaceIcon';
import { Place, PlaceCategory } from '../../sdk/models';
import { usePlaceCategory } from '../../hooks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.primary.main
        }
    })
);

export type PlaceAvatarProps = {
    place: Place;
};

export const PlaceAvatar: React.FunctionComponent<PlaceAvatarProps> = (
    { place }: PlaceAvatarProps
): JSX.Element => {
    const classes = useStyles();
    const placeCategories = place.categories.map(usePlaceCategory)
        .filter((placeCategory: PlaceCategory | undefined) => !!placeCategory) as PlaceCategory[];

    return (
        <Avatar className={classes.root}>
            {placeCategories.map((placeCategory: PlaceCategory) => (
                <PlaceIcon placeCategorySlug={placeCategory.slug}/>
            ))}
        </Avatar>
    );
};