import { Link, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from "react-router-dom";

import { AppRoutes } from '../../utils/Router';

export type HeaderProps = {};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            justifyContent: 'space-between'
        }
    },
    rootLink: {
        color: 'inherit',
        textDecoration: 'none'
    },
    navElements: {
        display: 'flex',
        listStyle: 'none',
        padding: 0
    },
    navElement: {
        '& a': {
            color: 'inherit',
            textDecoration: 'none'
        },
        '&:not(:last-child)': {
            marginRight: theme.spacing(3)
        }
    }
}));

export const Header: React.FunctionComponent<HeaderProps> = (): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <header className={classes.root}>
            <Typography className={classes.rootLink} variant="h3" component={RouterLink} to={AppRoutes.HOME}>
                ForChange
            </Typography>
            <nav>
                <ul className={classes.navElements}>
                    <li className={classes.navElement}>
                        <Link variant="h5" href={`${AppRoutes.HOME}#who-we-are`}>
                            {t('header.nav.who-we-are')}
                        </Link>
                    </li>
                    <li className={classes.navElement}>
                        <Link variant="h5" href={`${AppRoutes.HOME}#what-is-this`}>
                            {t('header.nav.what-is-this')}
                        </Link>
                    </li>
                </ul>  
            </nav>
        </header>
    );
};