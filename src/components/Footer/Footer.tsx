import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type FooterProps = {};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        padding: theme.spacing(3),
        justifyContent: 'flex-end'
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
            <p className={classes.withLove}>{t('footer.with-love')}</p>
        </footer>
    );
};