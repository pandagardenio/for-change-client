import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type PlacesMenuProps = {
    children: React.ReactNode;
}

export const PlacesMenu: React.FunctionComponent<PlacesMenuProps> = (
    { children }: PlacesMenuProps
): JSX.Element => {
    const { t } = useTranslation();
    const [isOpened, setIsOpened] = useState(false);

    const handleClose = () => { setIsOpened(false); };
    const toggleMenu = () => { setIsOpened(!isOpened); };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={toggleMenu}>
                {t('places.menu.cta')}
            </Button>
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