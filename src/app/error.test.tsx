import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import userEvent from '@testing-library/user-event';

import ErrorPage, { type ErrorPageProps, metadata } from '@/app/error';

describe(ErrorPage, () => {
  const mockReset = vi.fn();
  const mockError = new Error('Test error message');

  const defaultProps: ErrorPageProps = {
    error: mockError,
    reset: mockReset,
  };

  it('does not have any accessibility violations', async () => {
    const { container } = render(<ErrorPage {...defaultProps} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('renders correctly with snapshot', () => {
    const { container } = render(<ErrorPage {...defaultProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls reset function when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<ErrorPage {...defaultProps} />);

    const resetButton = screen.getByRole('button', { name: 'Try again' });
    await user.click(resetButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});

describe('metadata', () => {
  it('exports correct metadata object', () => {
    expect(metadata).toBeDefined();
    expect(metadata).toStrictEqual({
      title: 'Unexpected error | Nightstem',
      robots: 'noindex',
    });
  });

  it('has correct title for SEO', () => {
    expect(metadata.title).toBe('Unexpected error | Nightstem');
  });

  it('has noindex robots directive', () => {
    expect(metadata.robots).toBe('noindex');
  });
});
