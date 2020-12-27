import { makeStyles, Theme, AppBar, Toolbar, Container } from '@material-ui/core';
import React from 'react';

import { Nav } from './Nav';

export type HeaderProps = {};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'none'
    }
}));

export const Header: React.FunctionComponent<HeaderProps> = (): JSX.Element => {
    const classes = useStyles();

    return (
        <AppBar className={classes.root} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters={true}>
                    <Nav/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};