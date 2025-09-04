import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';

import Layout, { metadata, viewport } from './layout';
import type { Metadata, Viewport } from 'next';

vi.mock('next/font/google', () => {
  const actual = vi.importActual('next/font/google');
  return {
    ...actual,
    Geist: vi.fn().mockReturnValue({ variable: 'geist' }),
    Geist_Mono: vi.fn().mockReturnValue({ variable: 'geist_mono' }),
  };
});

vi.mock('@growthbook/growthbook-react', () => ({
  GrowthBook: vi.fn().mockImplementation(() => ({
    init: vi.fn().mockResolvedValue(undefined),
    destroy: vi.fn(),
    isReady: vi.fn().mockReturnValue(true),
    ready: vi.fn().mockResolvedValue(undefined),
    getFeatureValue: vi.fn().mockReturnValue(false),
  })),
  GrowthBookProvider: ({ children }: { children: React.ReactNode }) => children,
  useFeatureValue: vi.fn().mockReturnValue(false),
}));

describe('metadata', () => {
  it('has the correct information', () => {
    expect(metadata).toEqual({
      title: 'Nightstem',
      description:
        'Nightstem is a software studio creating thoughtful, minimal tools and digital experiences — quietly crafted after hours.',
    } satisfies Metadata);
  });
});

describe('viewport', () => {
  it('has the correct configuration', () => {
    expect(viewport).toEqual({
      width: 'device-width',
      initialScale: 1,
    } satisfies Viewport);
  });
});

describe('Layout', () => {
  const childrenText = 'Default Children Text';

  it('matches snapshot', async () => {
    let container;
    await act(async () => {
      const rendered = render(<Layout>{childrenText}</Layout>);
      container = rendered.container;
    });
    expect(container).toMatchSnapshot();
  });

  it('renders children correctly', async () => {
    await act(async () => render(<Layout>{childrenText}</Layout>));

    expect(await screen.findByText(childrenText)).toBeInTheDocument();
  });

  it('does not have accessibility violations', async () => {
    let container: Element;
    await act(async () => {
      const rendered = render(<Layout>{childrenText}</Layout>);
      container = rendered.container;
    });
    const result = await axe(container!);
    expect(result).toHaveNoViolations();
  });
});
