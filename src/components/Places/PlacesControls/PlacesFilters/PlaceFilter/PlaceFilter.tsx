import { Typography, makeStyles, Theme } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PlaceIcon } from '../../../../PlaceIcon';
import { PlaceCategorySlug } from '../../../../../sdk/models';

export type PlaceFilterProps = {
    isMoreButton?: boolean;
    onChange: (placeCategorySlug: PlaceCategorySlug) => void;
    placeCategorySlug?: PlaceCategorySlug;
    selected?: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        background: 'transparent',
        border: `1px solid ${theme.palette.grey[300]}`,
        cursor: 'pointer',
        height: 80,
        overflow: 'hidden',
        padding: theme.spacing(1),
        width: theme.spacing(9)
    },
    buttonSelected: {
        borderColor: theme.palette.secondary.main
    },
    icon: {
        background: theme.palette.grey[400],
        border : `1px solid ${theme.palette.grey[600]}`,
        borderRadius: '50%',
        padding: theme.spacing(1),
        height: theme.spacing(5),
        width: theme.spacing(5)
    },
    iconSelected: {
        color: theme.palette.secondary.main
    },
    figure: {
        margin: 0
    },
    figcaption: {
        color: theme.palette.grey[600]
    },
    figcaptionSelected: {
        color: theme.palette.secondary.main
    },
}));

export const PlaceFilter: React.FunctionComponent<PlaceFilterProps> = (
    { isMoreButton, placeCategorySlug, onChange, selected }: PlaceFilterProps
): JSX.Element => {
    const { t } = useTranslation();
    const classes = useStyles();

    const handleClick = () => { onChange(placeCategorySlug as PlaceCategorySlug); };

    const getIcon = (): JSX.Element => {
        if (isMoreButton) {
            return (
                <MoreHorizIcon
                    className={selected ? `${classes.iconSelected} ${classes.icon}`: classes.icon}
                />
            );
        }
        return (
            <PlaceIcon
                className={selected ? `${classes.iconSelected} ${classes.icon}`: classes.icon}
                placeCategorySlug={placeCategorySlug as PlaceCategorySlug}
            />
        );
    };

    return (
        <button
            className={selected ? `${classes.buttonSelected} ${classes.button}`: classes.button}
            onClick={handleClick}
        >
            <figure className={classes.figure}>
                {getIcon()}
                <figcaption>
                    <Typography
                        className={selected ? `${classes.figcaptionSelected} ${classes.figcaption}`: classes.figcaption}
                        variant="caption"
                    >
                        {t(`places.filters.labels.${isMoreButton ? 'more' : placeCategorySlug}`)}
                    </Typography>
                </figcaption>
            </figure>
        </button>  
    )
}