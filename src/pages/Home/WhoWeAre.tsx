import { makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3),
        textAlign: 'center'
    }
}));

export const WhoWeAre: React.FunctionComponent = (): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <section className={classes.root} id="who-we-are">
            <header>
                <Typography variant="h2">{t('home.who-we-are.title')}</Typography>
            </header>
            <Typography>{t('home.who-we-are.paragraph1')}</Typography>
            <Typography>{t('home.who-we-are.paragraph2')}</Typography>
            <Typography>{t('home.who-we-are.paragraph3')}</Typography>
            <Typography>{t('home.who-we-are.paragraph4')}</Typography>
        </section>
    )
};