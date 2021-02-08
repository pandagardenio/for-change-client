import { makeStyles, Theme } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useMemo, useCallback } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import throttle from 'lodash.throttle';

import { LatLngBoundsTuple } from '../../../sdk/models';

const provider = new OpenStreetMapProvider();

export type SearchResult = {
    x: string;
    y: string;
    label: string;
    bounds: LatLngBoundsTuple;
    raw: OpenStreetMapProviderResultRaw;
}

type OpenStreetMapProviderResultRaw = {
    boundingbox: [string, string, string, string];
    class: string;
    display_name: string;
    icon: string;
    importance: number;
    lat: string;
    licence: string;
    lon: string;
    osm_id: number;
    osm_type: string;
    place_id: number;
    type: string;
}

export type SearchAutocompleteProps = {
    onChange: (result: SearchResult | null) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

export const SearchAutocomplete: React.FunctionComponent<SearchAutocompleteProps> = (
    { onChange }: SearchAutocompleteProps
): JSX.Element => {
    const classes = useStyles();
    const [value, setValue] = React.useState<SearchResult | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<SearchResult[]>([]);

    const fetch = useMemo(
        () => throttle((query: string) => provider.search({ query }), 600),
        []);

    const handleChange = useCallback((_event: any, newValue: SearchResult | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        onChange(newValue);
    }, [onChange, options]);

    useEffect(() => {
        let active = true;

        if (!inputValue) {
            setOptions(value ? [value] : []);
            return undefined;
        }

        const fetchPromise = fetch(inputValue);
        fetchPromise && fetchPromise.then((results: SearchResult[]) => {
            if (active) {
                let newOptions: SearchResult[] = [];
                if (value) {
                    newOptions = [value];
                }
                if (results) {
                    newOptions = [...newOptions, ...results];
                }
                setOptions(newOptions);
            }
        });

        return () => { active = false; };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={handleChange}
            onInputChange={(_event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label="Add a location" variant="outlined" fullWidth />
            )}
            renderOption={(result: SearchResult) => {
                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            <Typography variant="body2" color="textSecondary">
                                {result.label}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}