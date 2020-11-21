import { Link, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from "react-router-dom";

import { AppRoutes } from '../../utils/Router';

export type HeaderProps = {};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    main: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    navElements: {
        display: 'flex',
        listStyle: 'none'
    }
}));

export const Header: React.FunctionComponent<HeaderProps> = (): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <header className={classes.root}>
            <div className={classes.main}>
                <h1>
                    <RouterLink to={AppRoutes.HOME}>ForChange.org</RouterLink>
                </h1>
                <nav>
                    <ul className={classes.navElements}>
                        <li>
                            <Link href={`${AppRoutes.HOME}#who-we-are`}>{t('header.nav.who-we-are')}</Link>
                        </li>
                        <li>
                            <Link href={`${AppRoutes.HOME}#what-is-this`}>{t('header.nav.what-is-this')}</Link>
                        </li>
                    </ul>  
                </nav>
            </div>
            <h2>{t('header.subtitle')}</h2>
        </header>
    );
};