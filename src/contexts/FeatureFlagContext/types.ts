import { ReactNode } from 'react';
import { GrowthBook, JSONValue } from '@growthbook/growthbook-react';

export type FeatureFlagClient = GrowthBook<Record<string, JSONValue>>;

export type FeatureFlagState = {
  client: FeatureFlagClient;
  isLoading: boolean;
  isReady: boolean;
  error: Error | null;
};

export type FeatureFlagProviderProps = {
  children?: ReactNode;
  apiHost?: string;
  clientKey?: string;
  enableDevMode?: boolean;
};
