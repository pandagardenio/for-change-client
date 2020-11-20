import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { PlaceType } from '../../models/Place';

export type MapFiltersValues = {
    [PlaceType.CLOTHING]: boolean;
    [PlaceType.GROCERIES]: boolean;
};

export type MapFiltersProps = {
    mapFiltersValues?: Partial<MapFiltersValues>;
    onChange: (mapFiltersValues: MapFiltersValues) => void;
};

const getMapFiltersValues = (
    mapFiltersValues: Partial<MapFiltersValues> = {}
): MapFiltersValues => ({
    [PlaceType.CLOTHING]: true,
    [PlaceType.GROCERIES]: true,
    ...mapFiltersValues
});

export const MapFilters: React.FunctionComponent<MapFiltersProps> = (
    props: MapFiltersProps
): JSX.Element => {
    const [mapFiltersValues, setMapFiltersValues] = useState<MapFiltersValues>(
        getMapFiltersValues(props.mapFiltersValues)
    );

    const onChange = (placeType: PlaceType): (event: React.ChangeEvent<HTMLInputElement>) => void =>
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const newMapFiltersValues = {
                ...mapFiltersValues,
                [placeType]: event.currentTarget.checked
            };
            setMapFiltersValues(newMapFiltersValues);
            props.onChange(newMapFiltersValues);
        };

    useEffect(() => {
        setMapFiltersValues(getMapFiltersValues(props.mapFiltersValues));
    }, [props.mapFiltersValues]);

    return (
        <FormGroup>
            <FormControlLabel
                control={<Switch checked={mapFiltersValues[PlaceType.CLOTHING]} onChange={onChange(PlaceType.CLOTHING)}/>}
                label={PlaceType.CLOTHING}
            />
            <FormControlLabel
                control={<Switch checked={mapFiltersValues[PlaceType.GROCERIES]} onChange={onChange(PlaceType.GROCERIES)}/>}
                label={PlaceType.GROCERIES}
            />
        </FormGroup>
    );
};