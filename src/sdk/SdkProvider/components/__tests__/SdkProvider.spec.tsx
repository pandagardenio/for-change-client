import { Packlink } from '@packlink/packlink-sdk';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { SdkProvider } from '../SdkProvider';
import { useSdk } from '../../hooks';

const Child: React.FunctionComponent = (): JSX.Element => {
    const sdk = useSdk();
    return sdk ? <span>1</span> : <span>0</span>;
};

describe('SdkProvider', (): void => {
    it('Provides a sdk instance to its children', (): void => {
        const sdk = new Packlink({ url: 'https://api.fake.url' });
        render(
            <SdkProvider sdk={sdk}>
                <Child />
            </SdkProvider>
        );
        expect(screen.getByText('1')).toBeInTheDocument();
    });
});
