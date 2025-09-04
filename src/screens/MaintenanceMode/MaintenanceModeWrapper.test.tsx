import { render, screen, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { MaintenanceModeWrapper } from './MaintenanceModeWrapper';
import { useFeatureFlag } from '@/contexts/FeatureFlagContext';

// Mock the MaintenanceMode component
vi.mock('./MaintenanceMode', () => ({
  MaintenanceMode: () => (
    <div data-testid="maintenance-mode">Maintenance Mode</div>
  ),
}));

// Mock the FeatureFlagContext
vi.mock('@/contexts/FeatureFlagContext', () => ({
  useFeatureFlag: vi.fn(),
}));

describe('MaintenanceModeWrapper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state when not ready', async () => {
    vi.mocked(useFeatureFlag).mockReturnValue([false, false]); // [isMaintenanceMode, isReady]

    await act(() => {
      render(
        <MaintenanceModeWrapper>
          <div data-testid="child">Test Child</div>
        </MaintenanceModeWrapper>,
      );
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    expect(screen.queryByTestId('maintenance-mode')).not.toBeInTheDocument();
  });

  it('should render children when ready and maintenance mode is off', async () => {
    vi.mocked(useFeatureFlag).mockReturnValue([false, true]); // [isMaintenanceMode, isReady]

    await act(() => {
      render(
        <MaintenanceModeWrapper>
          <div data-testid="child">Test Child</div>
        </MaintenanceModeWrapper>,
      );
    });

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByTestId('maintenance-mode')).not.toBeInTheDocument();
  });

  it('should render maintenance mode when ready and maintenance mode is on', async () => {
    vi.mocked(useFeatureFlag).mockReturnValue([true, true] as unknown as [
      false,
      false,
    ]); // [isMaintenanceMode, isReady]

    await act(() => {
      render(
        <MaintenanceModeWrapper>
          <div data-testid="child">Test Child</div>
        </MaintenanceModeWrapper>,
      );
    });

    expect(screen.getByTestId('maintenance-mode')).toBeInTheDocument();
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
