import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import React, { useState } from 'react';

export type MapMenuProps = {
    children: React.ReactNode;
}

export const MapMenu: React.FunctionComponent<MapMenuProps> = (
    { children }: MapMenuProps
): JSX.Element => {
    const [isOpened, setIsOpened] = useState(false);

    const handleClose = () => { setIsOpened(false); };
    const toggleMenu = () => { setIsOpened(!isOpened); };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={toggleMenu}>
                Filters
            </Button>
            <Dialog
                aria-labelledby="map-menu-title"
                fullWidth={true}
                maxWidth="xl"
                onClose={handleClose}
                open={isOpened}
            >
                <DialogTitle id="map-menu-title">Apply Filters</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};