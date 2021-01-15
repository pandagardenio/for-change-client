import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Place, PlaceDimension } from '../../sdk/models/Place';
import { useSdk } from '../../sdk';
import { PhysicalPlaces } from './PhysicalPlaces';
import { OnlinePlaces } from './OnlinePlaces';
import { PlaceListParams } from '../../sdk/dto';
import { getLovedPlaces, getSelectedPlaces } from '../../store/selectors';
import { getPlacesFilters, getShowOnlyLovedPlaces } from '../../store/selectors/status';

export type PlacesProps = {
    placeDimension?: PlaceDimension;
}

export const Places: React.FunctionComponent<PlacesProps> = (
    { placeDimension = PlaceDimension.PHYSICAL }: PlacesProps
): JSX.Element => {
    const [places, setPlaces] = useState<Place[]>([]);
    const showOnlyLovedPlaces = useSelector(getShowOnlyLovedPlaces);
    const lovedPlaces = useSelector(getLovedPlaces);
    const placesFilters = useSelector(getPlacesFilters);
    const selectedPlaces = useSelector(getSelectedPlaces);
    const sdk = useSdk();

    const getPlaces = useCallback(
        (placeListParams?: Partial<PlaceListParams>): Promise<Place[]> =>
            sdk.places.all(placeListParams),
        [sdk.places]
    );

    useEffect((): void => {
        if (showOnlyLovedPlaces) {
            setPlaces(lovedPlaces);
        } else {
            getPlaces({
                ...placesFilters
            })
            .then((places: Place[]) => {
                setPlaces(places);
            });
        }
    }, [getPlaces, lovedPlaces, placesFilters, showOnlyLovedPlaces]);

    const getPlacesToRender = (): Place[] => {
        return places.filter((place: Place) => {
            if (!selectedPlaces.length) {
                return true;
            }
            
            return !!selectedPlaces.filter((placeToFilter: Place) => place.id === placeToFilter.id).length; 
        });
    };

    const placesToRender = getPlacesToRender();

    const getPlacesComponent = (): JSX.Element => {

        switch (placeDimension) {
            case PlaceDimension.PHYSICAL:
                return(
                    <PhysicalPlaces rawPlaces={places} places={placesToRender.filter((place: Place) => place.physical)}/>
                );
            case PlaceDimension.ONLINE:
                return (
                    <OnlinePlaces places={placesToRender.filter((place: Place) => place.online)}/>
                );
        }
    };

    return (
        <section>
            {getPlacesComponent()}
        </section>
    );
};
