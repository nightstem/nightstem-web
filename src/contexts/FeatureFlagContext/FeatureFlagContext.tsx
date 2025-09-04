'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

import {
  GrowthBook,
  GrowthBookProvider,
  useFeatureValue,
} from '@growthbook/growthbook-react';

import {
  FeatureFlagProviderProps,
  FeatureFlagState,
} from '@/contexts/FeatureFlagContext/types';

import {
  FeatureFlagKey,
  FeatureFlagValues,
  FEATURE_FLAGS,
} from '@/contexts/FeatureFlagContext/constants';

const FeatureFlagStateContext = createContext<FeatureFlagState | null>(null);

/**
 * Hook to get feature flag state (loading, error, ready status)
 */
export const useFeatureFlagState = (): FeatureFlagState => {
  const context = useContext(FeatureFlagStateContext);
  if (!context) {
    throw new Error(
      'useFeatureFlagState must be used within a FeatureFlagProvider',
    );
  }
  return context;
};

/**
 * Type-safe hook for accessing feature flags
 * @returns Array [flagValue, isReady]
 */
export function useFeatureFlag<K extends FeatureFlagKey>(
  key: K,
): [FeatureFlagValues[K], boolean] {
  const { isReady } = useFeatureFlagState();
  const defaultValue = FEATURE_FLAGS[key];
  const value = useFeatureValue(key, defaultValue);

  return [(value ?? defaultValue) as FeatureFlagValues[K], isReady];
}

export const FeatureFlagProvider = ({
  children,
  apiHost = process.env.NEXT_PUBLIC_FEATURE_FLAG_HOST,
  clientKey = process.env.NEXT_PUBLIC_FEATURE_FLAG_CLIENT_KEY,
  enableDevMode = process.env.NODE_ENV === 'development',
}: FeatureFlagProviderProps) => {
  const [state, setState] = useState<FeatureFlagState>({
    client: new GrowthBook({}),
    isLoading: true,
    isReady: false,
    error: null,
  });

  const initializeFeatureFlags = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const growthbook = new GrowthBook({
        apiHost,
        clientKey,
        enableDevMode,
      });

      await growthbook.init();

      setState({
        client: growthbook,
        isLoading: false,
        isReady: true,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error : new Error('Unknown error occurred');

      setState({
        client: new GrowthBook({}),
        isLoading: false,
        isReady: false,
        error: errorMessage,
      });

      // In development, log the error for debugging
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to initialize feature flags:', errorMessage);
      }
    }
  }, [apiHost, clientKey, enableDevMode]);

  useEffect(() => {
    initializeFeatureFlags();

    return () => {
      state.client?.destroy?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializeFeatureFlags]);

  return (
    <FeatureFlagStateContext.Provider value={state}>
      <GrowthBookProvider growthbook={state.client}>
        {children}
      </GrowthBookProvider>
    </FeatureFlagStateContext.Provider>
  );
};
