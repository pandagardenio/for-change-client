import { Link, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Place } from '../../../../../sdk/models/Place';

export type PlaceUrlProps = {
    place: Place;
}

export const PlaceUrl: React.FunctionComponent<PlaceUrlProps> = (
    { place }: PlaceUrlProps
): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Link href={place.url} rel="noopener" target="_blank">
            <Typography variant="body2">{t('place.url.cta', { name: place.name })}</Typography>
        </Link>
    );
}