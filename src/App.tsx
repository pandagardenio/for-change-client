import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';

import { AppRouter } from './utils/Router';
import { theme } from './utils/theme';
import './utils/i18n';
import { ApiClient, SdkProvider, Sdk } from './sdk';

function App() {
    const sdk = new Sdk(new ApiClient({
        baseUrl: '/'
    }));

    return (
        <SdkProvider sdk={sdk}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppRouter/>
            </ThemeProvider>
        </SdkProvider>
    );
}

export default App;
