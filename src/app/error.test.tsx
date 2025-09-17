/* eslint-disable no-console */
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import userEvent from '@testing-library/user-event';

import ErrorPage, { type ErrorPageProps, metadata } from '@/app/error';

describe('ErrorPage', () => {
  const mockReset = vi.fn();
  const mockError = new Error('Test error message');

  const defaultProps: ErrorPageProps = {
    error: mockError,
    reset: mockReset,
  };

  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('does not have any accessibility violations', async () => {
    const { container } = render(<ErrorPage {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders correctly with snapshot', () => {
    const { container } = render(<ErrorPage {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('Behavior', () => {
    it('logs error to console on mount', () => {
      render(<ErrorPage {...defaultProps} />);

      expect(console.error).toHaveBeenCalledWith(mockError);
      expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('logs new error when error prop changes', () => {
      const { rerender } = render(<ErrorPage {...defaultProps} />);

      const newError = new Error('New error message');
      rerender(<ErrorPage error={newError} reset={mockReset} />);

      expect(console.error).toHaveBeenCalledWith(mockError);
      expect(console.error).toHaveBeenCalledWith(newError);
      expect(console.error).toHaveBeenCalledTimes(2);
    });

    it('calls reset function when reset button is clicked', async () => {
      const user = userEvent.setup();
      render(<ErrorPage {...defaultProps} />);

      const resetButton = screen.getByRole('button', { name: 'Try again' });
      await user.click(resetButton);

      expect(mockReset).toHaveBeenCalledTimes(1);
    });

    it('handles error with digest property', () => {
      const errorWithDigest = Object.assign(new Error('Test error'), {
        digest: 'error-digest-123',
      });

      render(<ErrorPage error={errorWithDigest} reset={mockReset} />);

      expect(console.error).toHaveBeenCalledWith(errorWithDigest);
    });
  });
});

describe('metadata', () => {
  it('exports correct metadata object', () => {
    expect(metadata).toBeDefined();
    expect(metadata).toEqual({
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
