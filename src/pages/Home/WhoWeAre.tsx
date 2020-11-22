import { makeStyles, Theme, Typography, Link } from '@material-ui/core';
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

    const formHref = 'https://forms.gle/3XBbijYGe1cuqkpm7';
    const mailHref = 'mailto:luis.grande@pandagarden.io';
    return (
        <section className={classes.root} id="who-we-are">
            <header>
                <Typography variant="h2">{t('home.who-we-are.title')}</Typography>
            </header>
            <Typography variant="body1">{t('home.who-we-are.paragraph1')}</Typography>
            <Typography variant="body1">{t('home.who-we-are.paragraph2')}</Typography>
            <Typography variant="body1">
                <Link href={mailHref}>{t('home.who-we-are.paragraph3')}</Link>
            </Typography>
            <Typography variant="body1">
                <Link rel="noopener" target="_blank" href={formHref}>{t('home.who-we-are.paragraph4')}</Link>
            </Typography>
        </section>
    )
};