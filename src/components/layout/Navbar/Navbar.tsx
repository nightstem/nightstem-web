import cx from 'classnames';

import { LinkButton } from '@/components/ui/Buttons';
import Logo, { LOGO_MODES, LOGO_SIZES } from '@/components/ui/Logo';

export type NavbarProps = {};

export const Navbar = () => {
  return (
    <nav className="w-full flex justify-center">
      <div
        className={cx(
          'screen-container px-2 py-2.5',
          'flex items-center justify-between',
        )}
      >
        <Logo mode={LOGO_MODES.HORIZONTAL} size={LOGO_SIZES.SM} />

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
