import { Packlink } from '@packlink/packlink-sdk';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { useSdk } from '../useSdk';
import { SdkProvider } from '../../components';

describe('useSdk', (): void => {
    const Component: React.FunctionComponent = (): JSX.Element => {
        const sdk = useSdk();
        return sdk ? <span>1</span> : <span>0</span>;
    };

    beforeAll(() => {
        console.error = jest.fn();
    });

    afterAll(() => {
        (console.error as jest.Mock).mockRestore();
    });

    afterEach(() => {
        (console.error as jest.Mock).mockClear();
    });

    it('Returns the sdk passed by the provider', (): void => {
        const sdk = new Packlink({ url: 'https://api.fake.url' });
        render(
            <SdkProvider sdk={sdk}>
                <Component />
            </SdkProvider>
        );
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('Throws an error if used in a not wrapped Component', (): void => {
        expect(() => {
            render(<Component />);
        }).toThrow('Wrap your Component in a SdkProvider Component');
        expect(console.error).toHaveBeenCalled();
    });
});
