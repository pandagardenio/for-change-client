import React from 'react';
import { useTranslation } from 'react-i18next';

export const WhoWeAre: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <section id="who-we-are">
            <header>
                <h2>{t('home.who-we-are.title')}</h2>
            </header>
            <p>{t('home.who-we-are.paragraph1')}</p>
            <p>{t('home.who-we-are.paragraph2')}</p>
            <p>{t('home.who-we-are.paragraph3')}</p>
            <p>{t('home.who-we-are.paragraph4')}</p>
        </section>
    )
};