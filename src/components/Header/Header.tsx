import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import { AppRoutes } from '../../utils/Router';

export type HeaderProps = {};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3),
    }
}));

export const Header: React.FunctionComponent<HeaderProps> = (): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <header className={classes.root}>
            <h1>
                <Link to={AppRoutes.HOME}>ForChange.org</Link>
            </h1>
            <h2>{t('header.subtitle')}</h2>
        </header>
    );
};