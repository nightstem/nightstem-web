import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';

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

  it('matches snapshot', () => {
    const { container } = render(<Layout>{childrenText}</Layout>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders children correctly', () => {
    const { getByText } = render(<Layout>{childrenText}</Layout>);
    expect(getByText(childrenText)).toBeInTheDocument();
  });

  it('does not have accessibility violations', async () => {
    const { container } = render(<Layout>{childrenText}</Layout>);
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
});
