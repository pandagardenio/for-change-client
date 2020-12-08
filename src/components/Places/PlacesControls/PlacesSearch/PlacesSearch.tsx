

import { makeStyles, Theme } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export type PlacesSearchProps = {
    onChange: (value: string) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        marginLeft: theme.spacing(2)
    }
}));

export const PlacesSearch: React.FunctionComponent<PlacesSearchProps> = (
    { onChange, onFocus }: PlacesSearchProps
): JSX.Element => {
    const { t } = useTranslation();
    const classes = useStyles();
    const ref = useRef<HTMLElement | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(event.currentTarget.value);
    }

    const handleFocus = (): void => {

    };

    return (
        <InputBase
            className={classes.input}
            inputProps={{ 'aria-label': t('places.search.aria-label') }}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder={t('places.search.placeholder')}
            inputRef={ref}
        />
    );
};
