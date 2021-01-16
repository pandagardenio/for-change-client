import { makeStyles, Theme, Dialog, useMediaQuery, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';

import { Place } from '../../../sdk/models/Place';
import { Map } from '../../Map';
import { PlacesSidebar } from '../../PlacesSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { getShowPlacesFilters } from '../../../store/selectors';
import { togglesPlaceFilters } from '../../../store/actions/status';
import { useTranslation } from 'react-i18next';

export type PhysicalPlacesProps = {
    places: Place[];
    rawPlaces: Place[];
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        position: 'relative'
    },
    sidebar: {
        background: theme.palette.background.default,
        padding: theme.spacing(3),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            boxShadow: '0px -2px 5px 0px rgb(222,222,222)',
            height: '80vh',
            width: theme.spacing(96)
        }
    },
    dialogClose: {
        alignSelf: 'flex-end'
    }
}));

export const PhysicalPlaces: React.FunctionComponent<PhysicalPlacesProps> = (
    { places, rawPlaces }: PhysicalPlacesProps
): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const showPlacesFilters = useSelector(getShowPlacesFilters);

    const handleClose = (): void => {
        dispatch(togglesPlaceFilters());
    };

    const getPlacesSidebar = () => {
        if (isDesktop) {
            return (
                <PlacesSidebar className={classes.sidebar} rawPlaces={rawPlaces} places={places}/>
            );
        }
        return (
            <Dialog fullScreen={true} open={showPlacesFilters}>
                <IconButton className={classes.dialogClose} color="inherit" onClick={handleClose} aria-label={t('close')}>
                    <CloseIcon/>
                </IconButton>
                <PlacesSidebar className={classes.sidebar} rawPlaces={rawPlaces} places={places}/>
            </Dialog>
        );
    };

    return (
        <div className={classes.root}>
            {getPlacesSidebar()}
            <Map places={places}/>
        </div>
    );
};