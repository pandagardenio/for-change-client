import { makeStyles, Theme, AppBar, Toolbar } from '@material-ui/core';
import React from 'react';

import { Menu } from './Menu';
import { Nav } from './Nav';

export type HeaderProps = {};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        boxShadow: 'none'
    }
}));

export const Header: React.FunctionComponent<HeaderProps> = (): JSX.Element => {
    const classes = useStyles();

    return (
        <AppBar className={classes.root} position="static">
            <Toolbar>
                <Menu/>
                <Nav/>
            </Toolbar>
        </AppBar>
    );
};