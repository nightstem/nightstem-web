import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { render } from '@testing-library/react';

import MaintenanceMode from '@/screens/MaintenanceMode';

const mockVersion = '1.0.0';
const originalEnv = process.env;

describe(MaintenanceMode, () => {
  beforeEach(() => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_APP_VERSION: mockVersion,
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should pass accessibility tests', async () => {
    const { container } = render(<MaintenanceMode />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should match snapshot', () => {
    const { container } = render(<MaintenanceMode />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
