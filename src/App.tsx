import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';

import { AppRouter } from './utils/Router';
import { theme } from './utils/theme';
import './utils/i18n';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppRouter/>
        </ThemeProvider>
    );
}

export default App;
