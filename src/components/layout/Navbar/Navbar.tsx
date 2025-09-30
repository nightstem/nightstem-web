'use client';
import cx from 'classnames';
import { useEffect, useRef } from 'react';

import { LinkButton } from '@/components/ui/Buttons';
import Logo, { LOGO_MODES, LOGO_SIZES } from '@/components/ui/Logo';
import Link from 'next/link';

const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /* v8 ignore next */
    if (!navbarRef.current) return;
    document.documentElement.style.setProperty(
      '--navbar-height',
      `${navbarRef.current.clientHeight}px`,
    );
  }, []);

  return (
    <nav ref={navbarRef} className="flex w-full justify-center">
      <div
        className={cx(
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

Navbar.displayName = 'Navbar';
export default Navbar;
