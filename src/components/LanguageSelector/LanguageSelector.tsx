import { Select, MenuItem } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const languageLabels: Record<string, string> = {
    en: 'English',
    fr: 'Français'
};

export const LanguageSelector: React.FunctionComponent = (): JSX.Element => {
    const { i18n } = useTranslation();

    const onChange = (event: React.ChangeEvent<{
        value: unknown;
    }>) => {
        i18n.changeLanguage(event.target.value as string);
    };

    return (
        <Select
            value={i18n.language}
            onChange={onChange}
        >
            {Object.keys(i18n.services.resourceStore.data).map((language: string) =>
                <MenuItem key={language} value={language}>{(languageLabels)[language]}</MenuItem>
            )}
        </Select>
    )
}