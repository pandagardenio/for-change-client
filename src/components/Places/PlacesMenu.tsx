import { Button, Dialog, DialogTitle, DialogContent, DialogActions, makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type PlacesMenuProps = {
    children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
    cta: {
        margin: `0 ${theme.spacing(3)}px`
    }
}));

export const PlacesMenu: React.FunctionComponent<PlacesMenuProps> = (
    { children }: PlacesMenuProps
): JSX.Element => {
    const { t } = useTranslation();
    const [isOpened, setIsOpened] = useState(false);

    const handleClose = () => { setIsOpened(false); };
    const toggleMenu = () => { setIsOpened(!isOpened); };

    const classes = useStyles();

    return (
        <>
            <div className={classes.cta}>
                <Button variant="outlined" color="primary" onClick={toggleMenu}>
                    {t('places.menu.cta')}
                </Button>
            </div>
            <Dialog
                aria-labelledby="places-menu-title"
                fullWidth={true}
                maxWidth="xl"
                onClose={handleClose}
                open={isOpened}
            >
                <DialogTitle id="places-menu-title">{t('places.menu.dialog.title')}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {t('places.menu.dialog.close')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};