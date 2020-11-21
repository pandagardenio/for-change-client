import React from 'react';
import { useTranslation } from 'react-i18next';

export const WhatIsThis: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <section id="what-is-this">
            <header>
                <h2>{t('home.what-is-this.title')}</h2>
            </header>
            <p>{t('home.what-is-this.paragraph1')}</p>
            <p>{t('home.what-is-this.paragraph2')}</p>
        </section>
    )
};