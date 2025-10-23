'use client';
import { useEffect, useRef } from 'react';

import cn from '@/utils/classnames';

import { LinkButton } from '@/components/ui/Buttons';
import Logo, { LOGO_MODES, LOGO_SIZES } from '@/components/ui/Logo';
import Link from 'next/link';

const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /* v8 ignore next -- @preserve */
    if (!navbarRef.current) return;
    document.documentElement.style.setProperty(
      '--navbar-height',
      `${navbarRef.current.clientHeight}px`,
    );
  }, []);

  return (
    <nav ref={navbarRef} className="flex w-full justify-center">
      <div
        className={cn(
          'screen-container py-2.5',
          'flex items-center justify-between',
        )}
      >
        <Link href="/">
          <Logo mode={LOGO_MODES.HORIZONTAL} size={LOGO_SIZES.SM} />
        </Link>

        <ol>
          <li>
            <LinkButton href="/" variant="text" color="neutral" size="sm">
              Home
            </LinkButton>
          </li>
        </ol>
      </div>
    </nav>
  );
};

export default Navbar;
