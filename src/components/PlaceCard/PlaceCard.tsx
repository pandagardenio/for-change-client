import { Link, makeStyles, Theme, createStyles, Card, CardHeader, Avatar, IconButton, CardContent, Typography, CardActions } from '@material-ui/core';
import DirectionsIcon from '@material-ui/icons/Directions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LanguageIcon from '@material-ui/icons/Language';
// import ShareIcon from '@material-ui/icons/Share';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Place } from '../../sdk/models/Place';
import { addLovedPlace, removeLovedPlace } from '../../store/actions';
import { isPlaceLoved as isPlaceLovedSelector } from '../../store/selectors';
import { PlaceIcon } from '../PlaceIcon';

export type PlaceCardProps = {
    className?: string;
    place: Place;
    raised?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
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
    { className, place, raised = true }: PlaceCardProps
): JSX.Element => {
    const { t } = useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const isPlaceLoved = useSelector(isPlaceLovedSelector(place.id));
    const getDirectionsUrl = (): string =>
        `https://www.google.com/maps/dir/?api=1&destination=${place.location.lat},${place.location.lng}`;

    const addToLovedPlaces = (): void => {
        if (isPlaceLoved) {
            dispatch(removeLovedPlace(place.id));
        } else {
            dispatch(addLovedPlace(place));
        }
    };
    return (
        <Card className={[classes.root, className].join(' ')} raised={raised}>
            <CardHeader
                avatar={<Avatar aria-label="place" className={classes.avatar}><PlaceIcon placeType={place.type}/></Avatar>}
                title={place.name}
                subheader={t(`place.type.${place.type}`)}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{place.description}</Typography>
            </CardContent>
            <CardActions className={classes.actions} disableSpacing>
                {place.location && <IconButton aria-label={t('place.directions.label', { name: place.name })} component={Link} href={getDirectionsUrl()} target="_blank" rel="noopener">
                    <DirectionsIcon/>
                </IconButton>}
                {place.url && <IconButton aria-label={t('place.url.label', { name: place.name })} component={Link} href={place.url} target="_blank" rel="noopener">
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
