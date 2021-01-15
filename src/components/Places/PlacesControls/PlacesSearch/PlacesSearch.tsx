

import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type PlacesSearchProps = {
    className?: string;
    onChange: (value: string) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const PlacesSearch: React.FunctionComponent<PlacesSearchProps> = (
    { className, onChange, onFocus }: PlacesSearchProps
): JSX.Element => {
    const { t } = useTranslation();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(event.currentTarget.value);
    }

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
        onFocus && onFocus(event);
    };

    return (
        <TextField
            inputProps={{ 'aria-label': t('places.search.aria-label') }}
            onChange={handleChange}
            onFocus={handleFocus}
            fullWidth={true}
            placeholder={t('places.search.placeholder')}
            variant="outlined"
            size="small"
            className={className}
        />
    );
};
