import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSelector } from '../LanguageSelector';

export type FooterProps = {};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        padding: theme.spacing(3),
        justifyContent: 'space-between'
    },
    withLove: {
        margin: 0
    }
}));

export const Footer: React.FunctionComponent<FooterProps> = (): JSX.Element => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <footer className={classes.root}>
            <LanguageSelector/>
            <p className={classes.withLove}>{t('footer.with-love')}</p>
        </footer>
    );
};