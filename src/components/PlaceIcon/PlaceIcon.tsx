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

import { PlaceCategorySlug } from '../../sdk/models';

export type PlaceIconProps = {
    className?: string;
    placeCategorySlug: PlaceCategorySlug;
}

export const PlaceIcon: React.FunctionComponent<PlaceIconProps> = (
    { className, placeCategorySlug }: PlaceIconProps
): JSX.Element => {
    const getIcon = (): JSX.Element => {
        switch (placeCategorySlug) {
            case PlaceCategorySlug.ACCOMMODATION:
                return <HotelIcon/>;
            case PlaceCategorySlug.CAFE:
                return <LocalCafeIcon/>;
            case PlaceCategorySlug.CLOTHING:
                return <LoyaltyIcon/>;
            case PlaceCategorySlug.COMMUNITY:
                return <ForumIcon/>;
            case PlaceCategorySlug.COSMETICS:
                return <PaletteIcon/>;
            case PlaceCategorySlug.EVENT:
                return <EventAvailableIcon/>;
            case PlaceCategorySlug.FARMING:
                return <EmojiNatureIcon/>;
            case PlaceCategorySlug.GROCERIES:
                return <LocalGroceryStoreIcon/>;
            case PlaceCategorySlug.HOUSING:
                return <HouseIcon/>;
            case PlaceCategorySlug.PROJECTS:
                return <FolderSharedIcon/>;
            case PlaceCategorySlug.SHOPPING:
                return <LocalMallIcon/>;
            case PlaceCategorySlug.URBAN_GARDEN:
                return <SpaIcon/>;
            case PlaceCategorySlug.WINE_CELLAR:
                return <LocalBarIcon/>;
            default:
                return (<span className={className}>?</span>);
        }
    };

    return getIcon();
}