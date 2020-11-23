import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import GroupIcon from '@material-ui/icons/Group';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import React from 'react';

import { Place, PlaceType } from '../../sdk/models';

export type PlaceIconProps = {
    place: Place;
}

export const PlaceIcon: React.FunctionComponent<PlaceIconProps> = (
    { place }: PlaceIconProps
): JSX.Element => {
    const getIcon = (): JSX.Element => {
        switch (place.type) {
            case PlaceType.ASSOCIATIONS:
                return <GroupIcon/>;
            case PlaceType.CLOTHING:
                return <LoyaltyIcon/>;
            case PlaceType.EVENTS:
                return <EventAvailableIcon/>;
            case PlaceType.GROCERIES:
                return <LocalGroceryStoreIcon/>;
            case PlaceType.SHOPPING:
                return <LocalMallIcon/>;
        }
    };

    return getIcon();
}