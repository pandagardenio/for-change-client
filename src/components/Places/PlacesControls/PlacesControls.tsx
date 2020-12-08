import { makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';

import { PlacesMenu, PlacesMenuOnChange, PlacesMenuTab } from './PlacesMenu';
import { PlacesSearch } from './PlacesSearch';
import { Place } from '../../../sdk/models/Place';

export type PlacesControlsOnChange = PlacesMenuOnChange;

export type PlacesControlsProps = {
    onChange: PlacesControlsOnChange;
    originalSelectedPlaces: Place[];
    places: Place[];
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        border: `1px solid black`,
        borderRadius: `${theme.shape.borderRadius * 8}px`,
        display: 'inline-flex'
    },
    menu: {
        borderLeft: `1px solid black`,
        borderRadius: 0
    }
}));

export const PlacesControls: React.FunctionComponent<PlacesControlsProps> = (
    { onChange, originalSelectedPlaces, places }: PlacesControlsProps
): JSX.Element => {
    const [menuState, setMenuState] = useState<{ open: boolean, searchQuery: string, tab: PlacesMenuTab }>({
        open: false,
        searchQuery: '',
        tab: PlacesMenuTab.CATEGORIES
    });
    const classes = useStyles();

    const onSearchChange = (searchQuery: string): void => {
        setMenuState({
            ...menuState,
            searchQuery
        });
    };

    const onChangeOpen = (open: boolean): void => {
        setMenuState({
            ...menuState,
            open
        });
    };

    const onChangeTab = (tab: PlacesMenuTab): void => {
        setMenuState({
            ...menuState,
            tab
        });
    };

    return (
        <div className={classes.root}>
            <PlacesSearch onChange={onSearchChange}/>
            <PlacesMenu
                {...menuState}
                className={classes.menu}
                onChange={onChange}
                onChangeTab={onChangeTab}
                onChangeOpen={onChangeOpen}
                originalSelectedPlaces={originalSelectedPlaces}
                places={places}
            />
        </div>
    );
};
