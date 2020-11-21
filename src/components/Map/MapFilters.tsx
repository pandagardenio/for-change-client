import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type MapFiltersValues<T> = T;

export type MapFiltersProps<T> = {
    mapFiltersValues: MapFiltersValues<T>;
    onChange: (mapFiltersValues: MapFiltersValues<T>) => void;
    title: string;
};

export const MapFilters = <T extends { [key: string]: boolean; }, >(
    props: MapFiltersProps<T>
): JSX.Element => {
    const { t } = useTranslation();
    const [mapFiltersValues, setMapFiltersValues] = useState<MapFiltersValues<T>>(props.mapFiltersValues);

    const onChange = (key: string): (event: React.ChangeEvent<HTMLInputElement>) => void =>
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const newMapFiltersValues = {
                ...mapFiltersValues,
                [key]: event.currentTarget.checked
            };
            setMapFiltersValues(newMapFiltersValues);
            props.onChange(newMapFiltersValues);
        };

    return (
        <>
            <h3>{props.title}</h3>
            <FormGroup>
                {Object.keys(mapFiltersValues).map((key: string, i: number) => (
                    <FormControlLabel
                        control={<Switch checked={mapFiltersValues[key]} onChange={onChange(key)}/>}
                        key={i}
                        label={t(`map.filters.labels.${key}`)}
                    />
                ))}
            </FormGroup>
        </>
    );
};