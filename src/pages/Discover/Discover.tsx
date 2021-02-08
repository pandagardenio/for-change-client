import { FormControl, InputLabel, Select, DialogContent, Dialog } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Layout } from '../../components/Layout';
import { PlaceCategorySlug, PlaceCategory } from '../../sdk/models';
import { usePlaceCategories } from '../../hooks';
import { Redirect } from 'react-router';
import { AppRoutes, getAppRoute } from '../../components/Router';

export const Discover: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();
    const placeCategories = usePlaceCategories();
    const [placeCategorySlug, setPlaceCategorySlug] = useState<PlaceCategorySlug | null>(null);

    const handleChange = (event: React.ChangeEvent<{ name?: string, value: unknown}>): void => {
        setPlaceCategorySlug(event.target.value as PlaceCategorySlug);
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
                    {placeCategories.map((category: PlaceCategory) => (
                        <option value={category.slug} key={category.slug}>
                            {t(`places.filters.labels.${category.slug}`)}
                        </option>
                    ))}
                </Select>
            </FormControl>
        );
    };

    if (placeCategorySlug) {
        return (
            <Redirect to={getAppRoute(AppRoutes.DISCOVER_RESULTS, { placeCategorySlug })}/>
        );
    }

    return (
        <Layout>
            <Dialog fullWidth={true} open={true}>
                <DialogContent>
                    {getStep1()}
                </DialogContent>
            </Dialog>
        </Layout>
    )
};