import { Link, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Place } from '../../../../../sdk/models/Place';

export type PlaceDirectionsProps = {
    place: Place;
}

export const PlaceDirections: React.FunctionComponent<PlaceDirectionsProps> = (
    { place }: PlaceDirectionsProps
): JSX.Element => {
    const { t } = useTranslation();

    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.location.lat},${place.location.lng}`;

    return (
        <Link href={url} rel="noopener" target="_blank">
            <Typography variant="body2">{t('place.directions.cta', { name: place.name })}</Typography>
        </Link>
    );
}