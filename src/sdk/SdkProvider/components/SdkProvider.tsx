import React from 'react';

import { SdkContext } from '../contexts';
import { Sdk } from '../../Sdk';

export type SdkProviderProps = {
    children: React.ReactNode;
    sdk: Sdk;
};

export const SdkProvider: React.FunctionComponent<SdkProviderProps> = ({
    children,
    sdk,
}: SdkProviderProps): JSX.Element => <SdkContext.Provider value={sdk}>{children}</SdkContext.Provider>;
