import { makeStyles, Theme, AppBar, Toolbar, Container } from '@material-ui/core';
import React from 'react';

import { Menu } from './Menu';
import { Nav } from './Nav';

export type HeaderProps = {};

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        paddingTop: `${theme.spacing(3)}px`,
        textAlign: 'right'
    },
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
            <Container maxWidth="xl">
                <Toolbar disableGutters={true}>
                    <Menu/>
                    <Nav/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};