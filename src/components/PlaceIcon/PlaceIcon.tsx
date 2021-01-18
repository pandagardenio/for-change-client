import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import ForumIcon from '@material-ui/icons/Forum';
import HotelIcon from '@material-ui/icons/Hotel';
import HouseIcon from '@material-ui/icons/House';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import PaletteIcon from '@material-ui/icons/Palette';
import SpaIcon from '@material-ui/icons/Spa';
import React from 'react';

import { PlaceCategory } from '../../sdk/models';

export type PlaceIconProps = {
    className?: string;
    placeCategory: PlaceCategory;
}

export const PlaceIcon: React.FunctionComponent<PlaceIconProps> = (
    { className, placeCategory }: PlaceIconProps
): JSX.Element => {
    const getIcon = (): JSX.Element => {
        switch (placeCategory) {
            case PlaceCategory.ACCOMMODATION:
                return <HotelIcon/>;
            case PlaceCategory.CAFE:
                return <LocalCafeIcon/>;
            case PlaceCategory.CLOTHING:
                return <LoyaltyIcon/>;
            case PlaceCategory.COMMUNITY:
                return <ForumIcon/>;
            case PlaceCategory.COSMETICS:
                return <PaletteIcon/>;
            case PlaceCategory.EVENT:
                return <EventAvailableIcon/>;
            case PlaceCategory.FARMING:
                return <EmojiNatureIcon/>;
            case PlaceCategory.GROCERIES:
                return <LocalGroceryStoreIcon/>;
            case PlaceCategory.HOUSING:
                return <HouseIcon/>;
            case PlaceCategory.PROJECTS:
                return <FolderSharedIcon/>;
            case PlaceCategory.SHOPPING:
                return <LocalMallIcon/>;
            case PlaceCategory.URBAN_GARDEN:
                return <SpaIcon/>;
            case PlaceCategory.WINE_CELLAR:
                return <LocalBarIcon/>;
            default:
                return (<span className={className}>?</span>);
        }
    };

    return getIcon();
}