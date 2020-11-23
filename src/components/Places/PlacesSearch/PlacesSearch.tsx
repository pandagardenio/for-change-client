import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Place } from '../../../sdk/models/Place';
import { PlacesSearchOption } from './PlacesSearchOption';

export type PlacesSearchProps = {
    onSelect: (places: Place[]) => void;
    places: Place[];
}

export const PlacesSearch: React.FunctionComponent<PlacesSearchProps> = (
    props: PlacesSearchProps
): JSX.Element => {
    const { t } = useTranslation();
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
            renderOption={(place, { selected }) => (<PlacesSearchOption place={place} selected={selected}/>)}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label={t('places.search.label')} placeholder={t('places.search.placeholder')}/>
            )}
        />
    );
};