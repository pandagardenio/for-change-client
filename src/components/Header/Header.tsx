import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import { AppRoutes } from '../../utils/Router';
import { LanguageSelector } from '../LanguageSelector';

export type HeaderProps = {};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    main: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export const Header: React.FunctionComponent<HeaderProps> = (): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <header className={classes.root}>
            <div className={classes.main}>
                <h1>
                    <Link to={AppRoutes.HOME}>ForChange.org</Link>
                </h1>
                <LanguageSelector/>
            </div>
            <h2>{t('header.subtitle')}</h2>
        </header>
    );
};