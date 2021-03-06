import { makeStyles, Theme, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import FilterListIcon from '@material-ui/icons/FilterList';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Place, PlaceType } from '../../../../sdk/models';
import { PlacesFilters, PlacesFiltersValues } from './PlacesFilters';
import { PlacesSearchList } from './PlacesSearchList';

export type PlaceTypeFiltersValues = Record<PlaceType, boolean>;

export enum PlacesMenuTab {
    CATEGORIES = 'CATEGORIES',
    PLACES = 'PLACES'
}

export type PlacesMenuOnChange = (filterValues: PlaceTypeFiltersValues, places: Place[]) => void;

export type PlacesMenuProps = {
    className: string;
    onChange: PlacesMenuOnChange;
    onChangeOpen: (open: boolean) => void;
    onChangeTab: (tab: PlacesMenuTab) => void;
    open: boolean;
    originalSelectedPlaces: Place[];
    places: Place[];
    searchQuery: string;
    tab: PlacesMenuTab;
};

const useStyles = makeStyles((theme: Theme) => ({
    placesList: {
        maxHeight: '300px',
        overflow: 'auto',
        padding: `0 ${theme.spacing(3)}px`
    },
    placesListTabPanel: {
        padding: 0
    },
    popoverPaper: {
        bottom: `-${theme.spacing(1)}px`,
        display: 'none',
        maxWidth: `calc(100vw - ${theme.spacing(3)}px)`,
        position: 'absolute',
        right: 0,
        transform: 'translateY(100%)',
        width: '500px',
        zIndex: 10000
    },
    popoverPaperOpen: {
        display: 'block'
    }
}));

export const PlacesMenu: React.FunctionComponent<PlacesMenuProps> = (
    {
        className, onChange, onChangeOpen, onChangeTab, open,
        originalSelectedPlaces, places, searchQuery, tab
    }: PlacesMenuProps
): JSX.Element => {
    const { t } = useTranslation();
    const anchorEl = useRef<HTMLButtonElement | null>(null);
    const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
    const [placeTypeFiltersValues, setPlaceTypeFiltersValues] = useState<PlaceTypeFiltersValues>({
        [PlaceType.ACCOMMODATION]: true,
        [PlaceType.CAFE]: true,
        [PlaceType.CLOTHING]: true,
        [PlaceType.COMMUNITY]: true,
        [PlaceType.COSMETICS]: true,
        [PlaceType.EVENT]: true,
        [PlaceType.FARMING]: true,
        [PlaceType.GROCERIES]: true,
        [PlaceType.HOUSING]: true,
        [PlaceType.PROJECTS]: true,
        [PlaceType.SHOPPING]: true,
        [PlaceType.URBAN_GARDEN]: true,
        [PlaceType.WINE_CELLAR]: true
    });

    const handleClick = (): void => {
        onChangeOpen(true);
        setSelectedPlaces(originalSelectedPlaces);
    };

    const handleClose = (): void => {
        onChangeOpen(false);
        setSelectedPlaces(originalSelectedPlaces);
    };

    const handleTabChange = (_event: React.ChangeEvent<{}>, newTabValue: string): void => {
        onChangeTab(newTabValue as PlacesMenuTab);
    };

    const onPlaceTypeFilterChange = (mapFiltersValues: PlacesFiltersValues<PlaceTypeFiltersValues>): void => {
        setPlaceTypeFiltersValues(mapFiltersValues);
        handleFilterChange(mapFiltersValues);
    };

    const handleFilterChange = (mapFiltersValues: PlacesFiltersValues<PlaceTypeFiltersValues>): void => {
        onChange(mapFiltersValues, selectedPlaces);
    };

    const onChangeSelectedPlaces = (places: Place[]): void => {
        setSelectedPlaces(places);
    };

    const applySelectedPlaces = (): void => {
        onChangeOpen(false);
        onChange(placeTypeFiltersValues, selectedPlaces);
    };

    const classes = useStyles();

    return (
        <>
            <IconButton
                className={className}
                edge="start"
                color="inherit"
                aria-controls="places-menu"
                aria-label={t('places.menu.label')}
                aria-haspopup="true"
                onClick={handleClick}
                ref={anchorEl}
            >
                <FilterListIcon/>
            </IconButton>
            <Paper className={open ? `${classes.popoverPaperOpen} ${classes.popoverPaper}` : classes.popoverPaper}>
                <TabContext value={tab}>
                    <TabList onChange={handleTabChange} aria-label={t('places.menu.tabs.label')} variant="fullWidth">
                        <Tab label={t('places.menu.tabs.categories.label')} value={PlacesMenuTab.CATEGORIES}/>
                        <Tab label={t('places.menu.tabs.places.label')} value={PlacesMenuTab.PLACES}/>
                    </TabList>
                    <TabPanel value={PlacesMenuTab.CATEGORIES}>
                        <PlacesFilters
                            className={classes.placesList}
                            placesFiltersValues={placeTypeFiltersValues}
                            onChange={onPlaceTypeFilterChange}
                        />
                    </TabPanel>
                    <TabPanel className={classes.placesListTabPanel} value={PlacesMenuTab.PLACES}>
                        <PlacesSearchList
                            applySelectedPlaces={applySelectedPlaces}
                            className={classes.placesList}
                            handleClose={handleClose}
                            onChangeSelectedPlaces={onChangeSelectedPlaces}
                            places={places}
                            searchQuery={searchQuery}
                            selectedPlaces={selectedPlaces}
                        />
                    </TabPanel>
                </TabContext>
            </Paper>
        </>
    );
}