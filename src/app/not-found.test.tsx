import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import NotFoundPage, { metadata } from '@/app/not-found';

vi.mock('@/screens/NotFound', () => ({
  default: vi.fn(() => (
    <div data-testid="not-found-component">NotFound Component</div>
  )),
}));

describe(NotFoundPage, () => {
  it('renders correctly with snapshot', () => {
    const { container } = render(<NotFoundPage />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders NotFound component', () => {
    render(<NotFoundPage />);

    const notFoundComponent = screen.getByTestId('not-found-component');

    expect(notFoundComponent).toBeInTheDocument();
    expect(notFoundComponent).toHaveTextContent('NotFound Component');
  });

  describe('metadata', () => {
    it('exports correct metadata object', () => {
      expect(metadata).toBeDefined();
      expect(metadata).toStrictEqual({
        title: 'Not found | Nightstem',
        robots: 'noindex',
      });
    });

    it('has correct title for SEO', () => {
      expect(metadata.title).toBe('Not found | Nightstem');
    });

    it('has noindex robots directive', () => {
      expect(metadata.robots).toBe('noindex');
    });
  });
});
