import { makeStyles, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MaterialUiMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { AppRoutes } from '../../../utils/Router';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        color: theme.palette.grey[500],
    },
    label: {
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: '100%',
        padding: theme.spacing(1)
    }
}));

export const Menu: React.FunctionComponent = (): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { t } = useTranslation();
    const classes = useStyles();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                classes={classes}
                edge="start"
                color="inherit"
                aria-controls="header-menu"
                aria-label={t('header.menu.label')}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MenuIcon/>
            </IconButton>
            <MaterialUiMenu
                id="header-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Link href={`${AppRoutes.HOME}#who-we-are`}>
                        {t('header.menu.nav.who-we-are')}
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link href={`${AppRoutes.HOME}#what-is-this`}>
                        {t('header.menu.nav.what-is-this')}
                    </Link>
                </MenuItem>
            </MaterialUiMenu>
        </>
    );
}