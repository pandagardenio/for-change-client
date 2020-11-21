import { useContext } from 'react';

import { Sdk } from '../../Sdk';
import { SdkContext } from '../contexts';

export const useSdk = (): Sdk => {
    const context = useContext(SdkContext);
    if (!context) {
        throw new Error('Wrap your Component in a SdkProvider Component');
    }
    return context as Sdk;
};
