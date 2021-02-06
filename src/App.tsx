import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { AppRouter } from './components/Router';
import { theme } from './utils/theme';
import './utils/i18n';
import { ApiClient, SdkProvider, Sdk } from './sdk';
import { store, persistor } from './store';

function App() {
    const { t, i18n } = useTranslation();

    const sdk = new Sdk(new ApiClient({
        baseUrl: '/'
    }));

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
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
            </PersistGate>
        </Provider>
    );
}

export default App;
