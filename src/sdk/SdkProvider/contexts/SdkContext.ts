import { createContext } from 'react';

import { Sdk } from '../../Sdk';

export const SdkContext = createContext<Sdk | null>(null);
