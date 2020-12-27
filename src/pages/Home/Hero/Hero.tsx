import { Hidden, Typography, Button, makeStyles, Theme, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as BrowserLink } from 'react-router-dom';

import hero from './hero.jpg';
import { AppRoutes } from '../../../utils/Router';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.spacing(8)
    },
    figure: {
        margin: 0
    },
    illustration: {
        width: '100%'
    },
    item: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5)
    },
    header: {
        marginBottom: theme.spacing(4)
    },
    actions: {
        marginTop: theme.spacing(4)
    },
    actionsButton: {
        marginRight: theme.spacing(4)
    }
}));

export const Hero: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();

    const classes = useStyles();

    return (
        <Grid className={classes.root} container component="section" justify="space-around">
            <Grid item xs={12} md={4}>
                <Paper className={classes.item} elevation={0}>
                    <header className={classes.header}>
                        <Typography variant="h2">{t('home.hero.title')}</Typography>
                    </header>
                    <Typography variant="body1">{t('home.hero.body')}</Typography>
                    <div className={classes.actions}>
                        <Button
                            className={classes.actionsButton}
                            component={BrowserLink}
                            variant="contained"
                            color="secondary"
                            to={AppRoutes.PLACES_PHYSICAL}
                        >{t('home.hero.actions.physical')}</Button>
                        <Button
                            variant="outlined"
                            color="default"
                            component={BrowserLink}
                            to={AppRoutes.PLACES_ONLINE}
                        >{t('home.hero.actions.online')}</Button>
                    </div>
                </Paper>
            </Grid>
            <Hidden xsDown>
                <Grid item md={4}>
                    <Paper className={classes.item} elevation={0}>
                        <figure className={classes.figure}>
                            <img className={classes.illustration} src={hero} alt={t('home.hero.image')}/>
                        </figure>
                    </Paper>
                </Grid>
            </Hidden>
        </Grid>
    );
};