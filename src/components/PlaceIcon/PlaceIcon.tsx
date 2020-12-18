import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import ForumIcon from '@material-ui/icons/Forum';
import GroupIcon from '@material-ui/icons/Group';
import HouseIcon from '@material-ui/icons/House';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import SpaIcon from '@material-ui/icons/Spa';
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
            case PlaceType.ASSOCIATION:
                return <GroupIcon/>;
            case PlaceType.CAFE:
                return <LocalCafeIcon/>;
            case PlaceType.CLOTHING:
                return <LoyaltyIcon/>;
            case PlaceType.COMMUNITY:
                return <ForumIcon/>;
            case PlaceType.EVENT:
                return <EventAvailableIcon/>;
            case PlaceType.FARMING:
                return <EmojiNatureIcon/>;
            case PlaceType.GROCERIES:
                return <LocalGroceryStoreIcon/>;
            case PlaceType.HOUSING:
                return <HouseIcon/>;
            case PlaceType.PROJECTS:
                return <FolderSharedIcon/>;
            case PlaceType.SHOPPING:
                return <LocalMallIcon/>;
            case PlaceType.URBAN_GARDEN:
                return <SpaIcon/>;
            default:
                return (<span>?</span>);
        }
    };

    return getIcon();
}