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

import { PlaceType } from '../../sdk/models';

export type PlaceIconProps = {
    className?: string;
    placeType: PlaceType;
}

export const PlaceIcon: React.FunctionComponent<PlaceIconProps> = (
    { className, placeType }: PlaceIconProps
): JSX.Element => {
    const getIcon = (): JSX.Element => {
        switch (placeType) {
            case PlaceType.ACCOMMODATION:
                return <HotelIcon className={className}/>;
            case PlaceType.CAFE:
                return <LocalCafeIcon className={className}/>;
            case PlaceType.CLOTHING:
                return <LoyaltyIcon className={className}/>;
            case PlaceType.COMMUNITY:
                return <ForumIcon className={className}/>;
            case PlaceType.COSMETICS:
                return <PaletteIcon className={className}/>;
            case PlaceType.EVENT:
                return <EventAvailableIcon className={className}/>;
            case PlaceType.FARMING:
                return <EmojiNatureIcon className={className}/>;
            case PlaceType.GROCERIES:
                return <LocalGroceryStoreIcon className={className}/>;
            case PlaceType.HOUSING:
                return <HouseIcon className={className}/>;
            case PlaceType.PROJECTS:
                return <FolderSharedIcon className={className}/>;
            case PlaceType.SHOPPING:
                return <LocalMallIcon className={className}/>;
            case PlaceType.URBAN_GARDEN:
                return <SpaIcon className={className}/>;
            case PlaceType.WINE_CELLAR:
                return <LocalBarIcon className={className}/>;
            default:
                return (<span className={className}>?</span>);
        }
    };

    return getIcon();
}