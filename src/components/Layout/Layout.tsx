import React from 'react';

import { Footer } from '../Footer';
import { Header } from '../Header';

export type LayoutProps = {
    children: JSX.Element;
}

export const Layout: React.FunctionComponent<LayoutProps> = (
    { children }: LayoutProps
): JSX.Element => (
    <>
        <Header/>
        {children}
        <Footer/>
    </>
)