import React from 'react';

export type HeaderProps = {};

export const Header: React.FunctionComponent<HeaderProps> = (): JSX.Element => (
    <header>
        <h1>ForChange.org</h1>
        <h2>Find Climate Change events near you</h2>
    </header>
)