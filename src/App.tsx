import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { AppRouter } from './utils/Router';
import { theme } from './utils/theme';
import './utils/i18n';
import { ApiClient, SdkProvider, Sdk } from './sdk';

function App() {
    const { t, i18n } = useTranslation();

    const sdk = new Sdk(new ApiClient({
        baseUrl: '/'
    }));

    return (
        <SdkProvider sdk={sdk}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Helmet>
                    <html lang={i18n.language}/>
                    <title>{t('meta.title')}</title>
                    <meta name="description" content={t('meta.description')}/>
                </Helmet>
                <AppRouter/>
            </ThemeProvider>
        </SdkProvider>
    );
}

export default App;
