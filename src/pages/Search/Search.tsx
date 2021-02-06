import { FormControl, InputLabel, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Layout } from '../../components/Layout';
import { PlaceCategory, PlaceDimension } from '../../sdk/models';
import { lightPlaceFilter } from '../../store/actions/status';
import { Places } from '../../components/Places';

export const Search: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [step, setStep] = useState<1 | 2>(1);
    const getPlaceCategory = (placeCategoryKey: string) => {
        //@ts-ignore
        return PlaceCategory[placeCategoryKey];
    };

    const handleChange = (event: React.ChangeEvent<{ name?: string, value: unknown}>): void => {
        console.log(event.target.value);
        dispatch(lightPlaceFilter(event.target.value as PlaceCategory));
        setStep(2);
    };

    const getStep1 = (): JSX.Element => {
        return (
            <FormControl>
                <InputLabel htmlFor="place-search">{t('places-controls.label.categories')}</InputLabel>
                <Select
                    native
                    onChange={handleChange}
                    inputProps={{
                        name: 'search',
                        id: 'place-search',
                    }}
                >
                    <option aria-label={t('search.selector.none')} value=""/>
                    {Object.keys(PlaceCategory).map((key: string) => (
                        <option value={getPlaceCategory(key)} key={key}>
                            {t(`places.filters.labels.${getPlaceCategory(key)}`)}
                        </option>
                    ))}
                </Select>
            </FormControl>
        );
    };

    const getStep2 = (): JSX.Element => {
        return (
            <>
                <Places/>
                <Places placeDimension={PlaceDimension.ONLINE}/>
            </>
        );
    };

    return (
        <Layout>
            <>
                {step === 1 && getStep1()}
                {step === 2 && getStep2()}
            </>
        </Layout>
    )
};