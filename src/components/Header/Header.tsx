import React from 'react';

export type HeaderProps = {};

export const Header: React.FunctionComponent<HeaderProps> = (): JSX.Element => (
    <header>
        <h1>Find Climate Change events near you</h1>
    </header>
)