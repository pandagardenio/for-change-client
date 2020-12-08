import { Checkbox, makeStyles, Theme, FormControlLabel } from '@material-ui/core';
import React from 'react';

import { Place } from '../../../../../../sdk/models/Place';

export type PlacesSearchListOptionChange = (place: Place, selected: boolean) => void;

export type PlacesSearchListOptionProps = {
    onChange: PlacesSearchListOptionChange;
    place: Place;
    selected: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    checkbox: {
        marginRight: theme.spacing(1)
    }
}));

export const PlacesSearchListOption: React.FunctionComponent<PlacesSearchListOptionProps> = (
    { onChange, place, selected }: PlacesSearchListOptionProps
): JSX.Element => {
    const classes = useStyles();

    const handleChange = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
        onChange(place, checked);
    };

    return (
        <FormControlLabel
            control={<Checkbox checked={selected} className={classes.checkbox} onChange={handleChange}/>}
            label={place.name}
        />
    );
};