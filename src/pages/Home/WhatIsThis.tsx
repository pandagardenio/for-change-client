import { makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3),
        textAlign: 'center'
    }
}));

export const WhatIsThis: React.FunctionComponent = (): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <section className={classes.root} id="what-is-this">
            <header>
                <Typography variant="h2">{t('home.what-is-this.title')}</Typography>
            </header>
            <Typography variant="body1">{t('home.what-is-this.paragraph1')}</Typography>
            <Typography variant="body1">{t('home.what-is-this.paragraph2')}</Typography>
        </section>
    )
};