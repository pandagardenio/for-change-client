import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';

export type HeaderProps = {};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3),
    }
}));

export const Header: React.FunctionComponent<HeaderProps> = (): JSX.Element => {
    const classes = useStyles();

    return (
        <header className={classes.root}>
            <h1>ForChange.org</h1>
            <h2>Find Climate Change events near you</h2>
        </header>
    );
};