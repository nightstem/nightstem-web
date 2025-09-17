import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MaintenanceModeWrapper } from '@/screens/MaintenanceMode/MaintenanceModeWrapper';

describe('MaintenanceModeWrapper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render children when ready and maintenance mode is off', () => {
    render(
      <MaintenanceModeWrapper>
        <div data-testid="child">Test Child</div>
      </MaintenanceModeWrapper>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 1, name: /We'll be back soon/iu }),
    ).not.toBeInTheDocument();
  });

  it('should render maintenance mode when ready and maintenance mode is on', () => {
    render(
      <MaintenanceModeWrapper isMaintenanceModeOn>
        <div data-testid="child">Test Child</div>
      </MaintenanceModeWrapper>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /We'll be back soon/iu }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });
});
