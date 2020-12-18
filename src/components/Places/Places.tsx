import { makeStyles, Theme, FormControlLabel, FormGroup, Switch, Container } from '@material-ui/core';
import { TabPanel, TabContext } from '@material-ui/lab';
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { theme } from '../../utils/theme';
import { Place, PlaceType, PlaceDimension } from '../../sdk/models/Place';
import { useSdk } from '../../sdk';
import { PhysicalPlaces } from './PhysicalPlaces';
import { OnlinePlaces } from './OnlinePlaces';
import { PlaceListParams } from '../../sdk/dto';
import { getLovedPlaces, getSelectedPlaces } from '../../store/selectors';
import { getPlaceDimension } from '../../store/selectors/status';
import { PlacesControls, PlaceTypeFiltersValues } from './PlacesControls';
import { setSelectedPlaces } from '../../store/actions';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        paddingTop: `${theme.spacing(3)}px`,
        textAlign: 'right'
    },
    root: {
        padding: `${theme.spacing(3)}px 0`
    }
}));

export const Places: React.FunctionComponent = (): JSX.Element => {
    const [places, setPlaces] = useState<Place[]>([]);
    const placeDimension = useSelector(getPlaceDimension);
    const [placeTypeFiltersValues, setPlaceTypeFiltersValues] = useState<Record<PlaceType, boolean>>({
        [PlaceType.ASSOCIATION]: true,
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
    const [showOnlyLovedPlaces, setShowOnlyLovedPlaces] = React.useState<boolean>(false);
    const lovedPlaces = useSelector(getLovedPlaces);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const sdk = useSdk();
    const selectedPlaces = useSelector(getSelectedPlaces);
    const getPlaces = useCallback(
        (placeListParams?: Partial<PlaceListParams>): Promise<Place[]> =>
            sdk.places.all(placeListParams),
        [sdk.places]
    );

    const onShowOnlyLovedPlacesChange = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
        setShowOnlyLovedPlaces(checked);
    };

    const onPlacesControlsChange = (filterValues: PlaceTypeFiltersValues, places: Place[]): void => {
        setPlaceTypeFiltersValues(filterValues);
        dispatch(setSelectedPlaces(places));
    };

    const classes = useStyles();

    useEffect((): void => {
        if (showOnlyLovedPlaces) {
            setPlaces(lovedPlaces);
        } else {
            getPlaces({
                ...placeTypeFiltersValues
            })
            .then((places: Place[]) => {
                setPlaces(places);
            });
        }
    }, [getPlaces, lovedPlaces, placeTypeFiltersValues, showOnlyLovedPlaces]);

    const getPlacesToRender = (): Place[] => {
        return places.filter((place: Place) => {
            if (!selectedPlaces.length) {
                return true;
            }
            
            return !!selectedPlaces.filter((placeToFilter: Place) => place.id === placeToFilter.id).length; 
        });
    };

    const placesToRender = getPlacesToRender();

    return (
        <section>
            <TabContext value={placeDimension}>
                <header>
                    <Container className={classes.container} maxWidth="xl">
                        <PlacesControls
                            places={places}
                            onChange={onPlacesControlsChange}
                            originalSelectedPlaces={selectedPlaces}
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={showOnlyLovedPlaces} onChange={onShowOnlyLovedPlacesChange}/>}
                                label={t(`places.filters.labels.loved`)}
                            />
                        </FormGroup>
                    </Container>
                </header>
                <TabPanel classes={classes} value={PlaceDimension.PHYSICAL} dir={theme.direction}>
                    <PhysicalPlaces places={placesToRender.filter((place: Place) => place.physical)}/>
                </TabPanel>
                <TabPanel value={PlaceDimension.ONLINE} dir={theme.direction}>
                    <OnlinePlaces places={placesToRender.filter((place: Place) => place.online)}/>
                </TabPanel>
            </TabContext>
        </section>
    );
};
