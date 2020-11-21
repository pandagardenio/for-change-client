import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type MapMenuProps = {
    children: React.ReactNode;
}

export const MapMenu: React.FunctionComponent<MapMenuProps> = (
    { children }: MapMenuProps
): JSX.Element => {
    const { t } = useTranslation();
    const [isOpened, setIsOpened] = useState(false);

    const handleClose = () => { setIsOpened(false); };
    const toggleMenu = () => { setIsOpened(!isOpened); };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={toggleMenu}>
                {t('map.menu.cta')}
            </Button>
            <Dialog
                aria-labelledby="map-menu-title"
                fullWidth={true}
                maxWidth="xl"
                onClose={handleClose}
                open={isOpened}
            >
                <DialogTitle id="map-menu-title">{t('map.menu.dialog.title')}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {t('map.menu.dialog.close')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};