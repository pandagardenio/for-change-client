import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { getShowOnlyLovedPlaces } from '../../../../store/selectors';
import { setShowLovedPlaces } from '../../../../store/actions/status';

export type LovedPlacesProps = {
    className?: string;
}

export const LovedPlaces: React.FunctionComponent<LovedPlacesProps> = (
    { className }: LovedPlacesProps
): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const showOnlyLovedPlaces = useSelector(getShowOnlyLovedPlaces);

    const onShowOnlyLovedPlacesChange = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        dispatch(setShowLovedPlaces(checked));
    };

    return (
        <FormGroup className={className}>
            <FormControlLabel
                control={<Switch checked={showOnlyLovedPlaces} onChange={onShowOnlyLovedPlacesChange}/>}
                label={t(`places.filters.labels.loved`)}
            />
        </FormGroup>
    );
};