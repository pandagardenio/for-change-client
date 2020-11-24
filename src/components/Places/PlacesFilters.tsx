import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type PlacesFiltersValues<T> = T;

export type PlacesFiltersProps<T> = {
    placesFiltersValues: PlacesFiltersValues<T>;
    onChange: (placesFiltersValues: PlacesFiltersValues<T>) => void;
    title: string;
};

export const PlacesFilters = <T extends { [key: string]: boolean; }, >(
    props: PlacesFiltersProps<T>
): JSX.Element => {
    const { t } = useTranslation();
    const [placesFiltersValues, setPlacesFiltersValues] = useState<PlacesFiltersValues<T>>(props.placesFiltersValues);

    const onChange = (key: string): (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void =>
        (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
            const newPlacesFiltersValues = {
                ...placesFiltersValues,
                [key]: checked
            };
            setPlacesFiltersValues(newPlacesFiltersValues);
            props.onChange(newPlacesFiltersValues);
        };

    return (
        <>
            <h3>{props.title}</h3>
            <FormGroup>
                {Object.keys(placesFiltersValues).map((key: string, i: number) => (
                    <FormControlLabel
                        control={<Switch checked={placesFiltersValues[key]} onChange={onChange(key)}/>}
                        key={i}
                        label={t(`places.filters.labels.${key}`)}
                    />
                ))}
            </FormGroup>
        </>
    );
};
