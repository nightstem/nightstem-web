import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useFeatureValue } from '@growthbook/growthbook-react';
import { render, screen, waitFor, act } from '@testing-library/react';

import {
  FeatureFlagProvider,
  useFeatureFlag,
  useFeatureFlagState,
} from '@/contexts/FeatureFlagContext';

// Mock GrowthBook to be synchronously ready
const mockInit = vi.fn().mockResolvedValue(undefined);
const mockDestroy = vi.fn();
const mockGrowthBook = {
  init: mockInit,
  destroy: mockDestroy,
};

vi.mock('@growthbook/growthbook-react', () => {
  return {
    GrowthBook: vi.fn(() => mockGrowthBook),
    GrowthBookProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useFeatureValue: vi.fn().mockReturnValue(false),
  };
});

const TestComponent = () => {
  const state = useFeatureFlagState();

  return (
    <div>
      <div data-testid="state-ready">{String(state.isReady)}</div>
      <div data-testid="state-loading">{String(state.isLoading)}</div>
      <div data-testid="state-error">
        {state.error ? String(state.error) : 'null'}
      </div>
    </div>
  );
};

const TestFeatureFlagComponent = () => {
  const [value, isReady] = useFeatureFlag('maintenance:global');

  return (
    <div>
      <div data-testid="flag-value">{String(value)}</div>
      <div data-testid="flag-ready">{String(isReady)}</div>
    </div>
  );
};

describe('FeatureFlagContext', () => {
  beforeEach(() => {
    mockInit.mockResolvedValue(undefined);
    vi.mocked(useFeatureValue).mockReturnValue(false);
  });

  describe('FeatureFlagProvider', () => {
    it('should render children', async () => {
      await act(async () =>
        render(
          <FeatureFlagProvider>
            <div data-testid="child">Test Child</div>
          </FeatureFlagProvider>,
        ),
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should initialize and provide context', async () => {
      await act(async () =>
        render(
          <FeatureFlagProvider>
            <TestComponent />
          </FeatureFlagProvider>,
        ),
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-ready')).toHaveTextContent('true');
      });
      expect(screen.getByTestId('state-loading')).toHaveTextContent('false');
    });

    it('should handle Error instance initialization failure', async () => {
      vi.stubEnv('NODE_ENV', 'development');

      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const testError = new Error('GrowthBook init failed');
      mockInit.mockRejectedValue(testError);

      await act(async () =>
        render(
          <FeatureFlagProvider>
            <TestComponent />
          </FeatureFlagProvider>,
        ),
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-ready')).toHaveTextContent('false');
      });
      expect(screen.getByTestId('state-loading')).toHaveTextContent('false');
      expect(screen.getByTestId('state-error')).toHaveTextContent(
        'GrowthBook init failed',
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to initialize feature flags:',
        testError,
      );

      consoleErrorSpy.mockRestore();
      vi.unstubAllEnvs();
    });

    it('should handle non-Error initialization failure', async () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockInit.mockRejectedValue('String error');

      await act(async () =>
        render(
          <FeatureFlagProvider>
            <TestComponent />
          </FeatureFlagProvider>,
        ),
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-ready')).toHaveTextContent('false');
      });
      expect(screen.getByTestId('state-loading')).toHaveTextContent('false');
      expect(screen.getByTestId('state-error')).toHaveTextContent(
        'Unknown error occurred',
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('useFeatureFlag', () => {
    it('should return feature flag value and ready state', async () => {
      await act(async () =>
        render(
          <FeatureFlagProvider>
            <TestFeatureFlagComponent />
          </FeatureFlagProvider>,
        ),
      );

      await waitFor(() => {
        expect(screen.getByTestId('flag-ready')).toHaveTextContent('true');
      });
      expect(screen.getByTestId('flag-value')).toHaveTextContent('false');
    });

    it('should use default value when useFeatureValue returns null', async () => {
      vi.mocked(useFeatureValue).mockReturnValue(null);

      await act(async () =>
        render(
          <FeatureFlagProvider>
            <TestFeatureFlagComponent />
          </FeatureFlagProvider>,
        ),
      );

      await waitFor(() => {
        expect(screen.getByTestId('flag-ready')).toHaveTextContent('true');
      });
      expect(screen.getByTestId('flag-value')).toHaveTextContent('false');
    });

    it('should throw error when used outside provider', () => {
      expect(() => {
        render(<TestFeatureFlagComponent />);
      }).toThrow(
        'useFeatureFlagState must be used within a FeatureFlagProvider',
      );
    });
  });

  describe('useFeatureFlagState', () => {
    it('should return context state', async () => {
      await act(async () =>
        render(
          <FeatureFlagProvider>
            <TestComponent />
          </FeatureFlagProvider>,
        ),
      );

      await waitFor(() => {
        expect(screen.getByTestId('state-ready')).toHaveTextContent('true');
      });
      expect(screen.getByTestId('state-loading')).toHaveTextContent('false');
      expect(screen.getByTestId('state-error')).toHaveTextContent('null');
    });

    it('should throw error when used outside provider', () => {
      const TestComponentDirect = () => {
        useFeatureFlagState();
        return <div>Test</div>;
      };

      expect(() => {
        render(<TestComponentDirect />);
      }).toThrow(
        'useFeatureFlagState must be used within a FeatureFlagProvider',
      );
    });
  });
});
