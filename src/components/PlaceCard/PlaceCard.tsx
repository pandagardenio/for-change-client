import { Link, makeStyles, Theme, createStyles, Card, CardHeader, Avatar, IconButton, CardContent, Typography, CardActions } from '@material-ui/core';
import DirectionsIcon from '@material-ui/icons/Directions';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import LanguageIcon from '@material-ui/icons/Language';
// import ShareIcon from '@material-ui/icons/Share';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Place } from '../../sdk/models/Place';
import { PlaceIcon } from '../PlaceIcon';

export type PlaceCardProps = {
    className?: string;
    place: Place;
    raised?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
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
    const getDirectionsUrl = (): string => 
        `https://www.google.com/maps/dir/?api=1&destination=${place.location.lat},${place.location.lng}`;

    return (
        <Card className={[classes.root, className].join(' ')} raised={raised}>
            <CardHeader
                avatar={<Avatar aria-label="place" className={classes.avatar}><PlaceIcon place={place}/></Avatar>}
                title={place.name}
                subheader={t(`place.type.${place.type}`)}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{place.description}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                {place.location && <IconButton aria-label={t('place.directions.label', { name: place.name })} component={Link} href={getDirectionsUrl()} target="_blank" rel="noopener">
                    <DirectionsIcon/>
                </IconButton>}
                {place.url && <IconButton aria-label={t('place.url.label', { name: place.name })} component={Link} href={place.url} target="_blank" rel="noopener">
                    <LanguageIcon/>
                </IconButton>}
                {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="share" component={Link}>
                    <ShareIcon/>
                </IconButton> */}
            </CardActions>
        </Card>
      );
};