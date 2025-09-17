import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

import NotFound from '@/screens/NotFound/NotFound';
import { notFoundList, defaultNotFound } from '@/screens/NotFound/constants';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

const mockPush = vi.fn();
const mockRouter = { push: mockPush } as unknown as ReturnType<
  typeof useRouter
>;

describe('NotFound', () => {
  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue(mockRouter);
    vi.mocked(usePathname).mockReturnValue('/some-path');
    mockPush.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly with snapshot', () => {
    const { container } = render(<NotFound />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<NotFound />);
    const results = await act(async () => axe(container!));
    expect(results).toHaveNoViolations();
  });

  describe('Click functionality', () => {
    it('navigates to home when go home link is clicked', async () => {
      const user = userEvent.setup();
      render(<NotFound />);

      const goHomeLink = screen.getByRole('link', { name: 'Go home' });
      await user.click(goHomeLink);

      expect(goHomeLink).toHaveAttribute('href', '/');
    });

    it('shuffles content when shuffle button is clicked', async () => {
      const user = userEvent.setup();
      render(<NotFound />);

      const shuffleButton = screen.getByRole('button', {
        name: /show another message/i,
      });
      await user.click(shuffleButton);

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('shuffles content multiple times to test collision handling', async () => {
      const phrases = [
        { title: 'First', description: 'First desc' },
        { title: 'Second', description: 'Second desc' },
      ];
      const user = userEvent.setup();
      render(<NotFound notFoundPhrases={phrases} />);

      const shuffleButton = screen.getByRole('button', {
        name: /show another message/i,
      });

      for (let i = 0; i < 10; i++) {
        await user.click(shuffleButton);
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      }
    });
  });

  describe('Keyboard functionality', () => {
    it('navigates to home when Escape key is pressed', async () => {
      const user = userEvent.setup();
      render(<NotFound />);

      await user.keyboard('{Escape}');

      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('shuffles content when R key is pressed', async () => {
      const user = userEvent.setup();
      render(<NotFound />);

      await user.keyboard('r');

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('shuffles content when uppercase R key is pressed', async () => {
      const user = userEvent.setup();
      render(<NotFound />);

      await user.keyboard('R');

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('ignores other key presses', async () => {
      const user = userEvent.setup();
      render(<NotFound />);

      await user.keyboard('a');
      await user.keyboard('Enter');
      await user.keyboard(' ');

      expect(mockPush).not.toHaveBeenCalled();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });
  });

  describe('Edge cases and error scenarios', () => {
    it('handles single phrase array - shuffle should not change content', async () => {
      const singlePhrase = [
        { title: 'Single Title', description: 'Single Description' },
      ];
      const user = userEvent.setup();

      render(<NotFound notFoundPhrases={singlePhrase} />);

      expect(screen.getByText('Single Title')).toBeInTheDocument();
      expect(screen.getByText('Single Description')).toBeInTheDocument();

      const shuffleButton = screen.getByRole('button', {
        name: /show another message/i,
      });
      await user.click(shuffleButton);

      expect(screen.getByText('Single Title')).toBeInTheDocument();
      expect(screen.getByText('Single Description')).toBeInTheDocument();

      await user.keyboard('R');

      expect(screen.getByText('Single Title')).toBeInTheDocument();
      expect(screen.getByText('Single Description')).toBeInTheDocument();
    });

    it('handles undefined pathname', () => {
      vi.mocked(usePathname).mockReturnValue(undefined as unknown as string);

      render(<NotFound />);

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('handles null pathname', () => {
      vi.mocked(usePathname).mockReturnValue(null as unknown as string);

      render(<NotFound />);

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('falls back to defaultNotFound when index is out of bounds', () => {
      // Create empty array to force fallback to defaultNotFound
      render(<NotFound notFoundPhrases={[]} />);

      expect(
        screen.getByRole('heading', { level: 2, name: defaultNotFound.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(defaultNotFound.description)).toBeInTheDocument();
    });

    it('handles custom notFoundPhrases prop', () => {
      const customPhrases = [
        { title: 'Custom Title', description: 'Custom Description' },
      ];

      render(<NotFound notFoundPhrases={customPhrases} />);

      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom Description')).toBeInTheDocument();
    });

    it('has proper ARIA attributes for accessibility', () => {
      render(<NotFound />);

      const section = screen.getByRole('region');
      const heading = screen.getByRole('heading', { level: 2 });

      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('aria-labelledby', 'nf-title');
      expect(section).toHaveAttribute('aria-describedby', 'nf-desc');
      expect(heading).toHaveAttribute('id', 'nf-title');
    });

    it('shuffle button has proper accessibility attributes', () => {
      render(<NotFound />);

      const shuffleButton = screen.getByRole('button', {
        name: /show another message/i,
      });

      expect(shuffleButton).toHaveAttribute(
        'aria-label',
        'Show another message (press R)',
      );
      expect(shuffleButton).toHaveAttribute('title', 'Shuffle (R)');
    });
  });

  describe('Content validation', () => {
    it('displays content from notFoundList or default', () => {
      render(<NotFound />);

      const title = screen.getByRole('heading', { level: 2 }).textContent!;
      const description = screen.getByText(/.*/, {
        selector: 'p',
      }).textContent!;

      const isValidContent =
        notFoundList.some(
          (item) => item.title === title && item.description === description,
        ) ||
        (title === defaultNotFound.title &&
          description === defaultNotFound.description);

      expect(isValidContent).toBe(true);
    });

    it('can display different content based on pathname hash', () => {
      vi.mocked(usePathname).mockReturnValue('/path1');
      const { unmount } = render(<NotFound />);
      const title1 = screen.getByRole('heading', { level: 2 }).textContent;
      unmount();

      vi.mocked(usePathname).mockReturnValue('/path2');
      render(<NotFound />);
      const title2 = screen.getByRole('heading', { level: 2 }).textContent;

      expect(title1).toBeTruthy();
      expect(title2).toBeTruthy();
    });
  });
});
