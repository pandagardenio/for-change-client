import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';

import { Place } from '../../../models/Place';
import { MapSearchOption } from './MapSearchOption';

export type MapSearchProps = {
    onSelect: (places: Place[]) => void;
    places: Place[];
}

export const MapSearch: React.FunctionComponent<MapSearchProps> = (
    props: MapSearchProps
): JSX.Element => {
    const [places, setPlaces] = useState(props.places);

    const handleChange = (_event: React.ChangeEvent<{}>, places: Place[]) => {
        props.onSelect(places);
    }

    useEffect((): void => {
        setPlaces(props.places);
    }, [props.places]);

    return (
        <Autocomplete
            multiple
            id="map-search"
            options={places}
            disableCloseOnSelect
            getOptionLabel={(place: Place) => place.name}
            onChange={handleChange}
            renderOption={(place, { selected }) => (<MapSearchOption place={place} selected={selected}/>)}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Places" placeholder="My favourite place"/>
            )}
        />
    );
};