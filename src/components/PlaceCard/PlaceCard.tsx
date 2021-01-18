import { Link, makeStyles, Theme, createStyles, Card, CardHeader, IconButton, CardContent, Typography, CardActions } from '@material-ui/core';
import DirectionsIcon from '@material-ui/icons/Directions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LanguageIcon from '@material-ui/icons/Language';
// import ShareIcon from '@material-ui/icons/Share';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Place, PlaceShop } from '../../sdk/models/Place';
import { addLovedPlace, removeLovedPlace } from '../../store/actions';
import { isPlaceLoved as isPlaceLovedSelector } from '../../store/selectors';
import { PlaceAvatar } from './PlaceAvatar';
import { PlaceLogo } from './PlaceLogo';

export type PlaceCardProps = {
    className?: string;
    place: Place;
    raised?: boolean;
    shop?: PlaceShop;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        content: {
            height: '200px',
            overflow: 'auto'
        },
        actions: {
            marginTop: 'auto'
        },
        avatar: {
            backgroundColor: theme.palette.primary.main,
        },
    }),
);

export const PlaceCard: React.FunctionComponent<PlaceCardProps> = (
    { className, place, raised = true, shop }: PlaceCardProps
): JSX.Element => {
    const { t } = useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const isPlaceLoved = useSelector(isPlaceLovedSelector(place.slug));
    const getDirectionsUrl = (): string =>
        `https://www.google.com/maps/dir/?api=1&destination=${shop?.lat},${shop?.lng}`;

    const addToLovedPlaces = (): void => {
        if (isPlaceLoved) {
            dispatch(removeLovedPlace(place.slug));
        } else {
            dispatch(addLovedPlace(place));
        }
    };

    const getAvatar = (): JSX.Element => {
        return place.logo ?
            <PlaceLogo logo={place.logo}/> :
            <PlaceAvatar place={place}/>
    };

    return (
        <Card className={[classes.root, className].join(' ')} raised={raised}>
            <CardHeader
                avatar={getAvatar()}
                title={place.name}
                subheader={t(`place.type.${place.category}`)}
            />
            <CardContent className={classes.content}>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    dangerouslySetInnerHTML={{ __html: place.description }}
                />
            </CardContent>
            <CardActions className={classes.actions} disableSpacing>
                {shop && <IconButton aria-label={t('place.directions.label', { name: place.name })} component={Link} href={getDirectionsUrl()} target="_blank" rel="noopener">
                    <DirectionsIcon/>
                </IconButton>}
                {place.siteUrl && <IconButton aria-label={t('place.url.label', { name: place.name })} component={Link} href={place.siteUrl} target="_blank" rel="noopener">
                    <LanguageIcon/>
                </IconButton>}
                <IconButton aria-label={t('place.like.label', { name: place.name })} onClick={addToLovedPlaces}>
                    <FavoriteIcon color={isPlaceLoved ? 'secondary' : 'inherit'}/>
                </IconButton>
                {/* <IconButton aria-label="share" component={Link}>
                    <ShareIcon/>
                </IconButton> */}
            </CardActions>
        </Card>
      );
};
