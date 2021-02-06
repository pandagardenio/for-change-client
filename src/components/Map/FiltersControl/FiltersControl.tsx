import FilterListIcon from '@material-ui/icons/FilterList';
import L from 'leaflet';
import React, { useEffect, useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useMap } from 'react-leaflet';

import { togglesPlaceFilters } from '../../../store/actions/status';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        background: theme.palette.background.paper,
        border: 0,
        cursor: 'pointer',
        padding: theme.spacing(0.5),
        width: 30
    }
}));

export const FiltersControl: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();
    const map = useMap();
    const dispatch = useDispatch();
    const classes = useStyles();

    const filtersControl = useMemo(() => {
        const getFiltersControlHtmlElement = (): HTMLElement => {
            const onClick = (): void => {
                dispatch(togglesPlaceFilters());
            };
    
            const div = document.createElement('div');
            div.className = 'leaflet-bar leaflet-control';
            const button = document.createElement('button');
            button.className = classes.button;
            button.setAttribute('aria-label', t('map.controls.filters.label'));
            button.onclick = onClick;
            button.innerHTML = renderToStaticMarkup((
                <FilterListIcon fontSize="small"/>
            ));
            div.appendChild(button);
            return div;
        };

        return new (L.Control.extend({
            onAdd: () => getFiltersControlHtmlElement()
        }))({
            position: 'topright'
        });
    }, [classes.button, dispatch, t]);

    useEffect((): () => void => {
        filtersControl.addTo(map);
        return (): void => { filtersControl.remove(); }
    }, [filtersControl, map]);

    return (
        <></>
    )
};
