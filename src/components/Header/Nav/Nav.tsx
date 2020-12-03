import { Tabs, Tab, makeStyles } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PlaceDimension } from '../../../sdk/models/Place';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaceDimension } from '../../../store/actions/status';
import { getPlaceDimension } from '../../../store/selectors/status';

const useStylesTabs = makeStyles(() => ({
    indicator: {
        display: 'none'
    },
    root: {
        marginLeft: 'auto'
    }
}));

const useStylesTab = makeStyles(() => ({
    root: {
        textTransform: 'none'
    }
}));

export const Nav: React.FunctionComponent = (): JSX.Element => {
    const placeDimension = useSelector(getPlaceDimension);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleChange = (_event: React.ChangeEvent<{}>, newDimension: string) => {
        dispatch(setPlaceDimension(newDimension as PlaceDimension))
    };

    const tabsClasses = useStylesTabs();
    const tabClasses = useStylesTab();

    return (
        <Tabs
            classes={tabsClasses}
            value={placeDimension}
            onChange={handleChange}
            variant="standard"
            textColor="secondary"
            aria-label="icon label tabs example"
        >
            <Tab classes={tabClasses} label={t('header.nav.dimensions.physical')} value={PlaceDimension.PHYSICAL} />
            <Tab classes={tabClasses} label={t('header.nav.dimensions.online')} value={PlaceDimension.ONLINE} />
        </Tabs>
    );
}