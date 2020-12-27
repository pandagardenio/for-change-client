import { makeStyles, Button, Theme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as BrowserLink } from 'react-router-dom';

import { AppRoutes } from '../../../utils/Router';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginLeft: 'auto'
    },
    link: {
        textTransform: 'none'
    },
    activeLink: {
        color: theme.palette.secondary.main,
    }
}));

export const Nav: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <nav className={classes.root}>
            <Button
                className={classes.link}
                component={BrowserLink}
                to={AppRoutes.PLACES_PHYSICAL}
                activeClassName={classes.activeLink}
            >
                {t('header.nav.dimensions.physical')}
            </Button>
            <Button
                className={classes.link}
                component={BrowserLink}
                to={AppRoutes.PLACES_ONLINE}
                activeClassName={classes.activeLink}
            >
                {t('header.nav.dimensions.online')}
            </Button>
        </nav>
    );
}