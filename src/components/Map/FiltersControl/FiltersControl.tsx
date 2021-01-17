import FilterListIcon from '@material-ui/icons/FilterList';
import L from 'leaflet';
import React, { useEffect, useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useMap } from 'react-leaflet';

import { togglesPlaceFilters } from '../../../store/actions/status';
import { useTheme, useMediaQuery } from '@material-ui/core';

export const FiltersControl: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();
    const map = useMap();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const filtersControl = useMemo(() => {
        const getFiltersControlHtmlElement = (): HTMLElement => {
            const onClick = (): void => {
                dispatch(togglesPlaceFilters());
            };
    
            const div = document.createElement('div');
            div.className = 'leaflet-bar leaflet-control';
            const button = document.createElement('button');
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
    }, [dispatch, t]);

    useEffect((): () => void => {
        filtersControl.addTo(map);
        return (): void => { filtersControl.remove(); }
    }, [filtersControl, map]);


    useEffect((): void => {
        if (!isDesktop) {
            filtersControl.addTo(map);
        } else {
            filtersControl.remove();
        }
    }, [filtersControl, isDesktop, map]);

    return (
        <></>
    )
};
