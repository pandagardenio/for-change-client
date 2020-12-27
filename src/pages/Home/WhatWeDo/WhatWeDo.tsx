import { makeStyles, Theme, Typography, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        marginBottom: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    figure: {
        margin: 0
    },
    illustration: {
        width: '100%'
    },
    header: {
        marginBottom: theme.spacing(3)
    },
    item: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5)
    },
    itemHeader: {
        marginBottom: theme.spacing(1)
    }
}));

export const WhatWeDo: React.FunctionComponent = (): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <section className={classes.root} id="what-we-do">
            <header className={classes.header}>
                <Typography variant="h2" align="center">{t('home.what-we-do.title')}</Typography>
            </header>
            <Grid container justify="space-around">
                <Grid item xs={12} md={3}>
                    <Paper elevation={0}>
                        <header className={classes.itemHeader}>
                            <Typography variant="h3">{t('home.what-we-do.search.title')}</Typography>
                        </header>
                        <Typography variant="body1">{t('home.what-we-do.search.text')}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper elevation={0}>
                        <header className={classes.itemHeader}>
                            <Typography variant="h3">{t('home.what-we-do.collect.title')}</Typography>
                        </header>
                        <Typography variant="body1">{t('home.what-we-do.collect.text')}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper elevation={0}>
                        <header className={classes.itemHeader}>
                            <Typography variant="h3">{t('home.what-we-do.show.title')}</Typography>
                        </header>
                        <Typography variant="body1">{t('home.what-we-do.show.text')}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </section>
    )
};