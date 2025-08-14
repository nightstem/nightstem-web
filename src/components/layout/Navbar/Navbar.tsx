import cx from 'classnames';

import { ButtonLink } from '@/components/ui/Buttons';
import Logo, { LOGO_MODES, LOGO_SIZES } from '@/components/ui/Logo';

export type NavbarProps = {};

export const Navbar = () => {
  return (
    <nav
      className={cx(
        'w-full flex justify-center',
        'shadow-sm shadow-neutral-500',
      )}
    >
      <div
        className={cx(
          'screen-container px-2 py-2.5',
          'flex items-center justify-between',
        )}
      >
        <Logo mode={LOGO_MODES.HORIZONTAL} size={LOGO_SIZES.MD} />

        <ol>
          <li>
            <ButtonLink href="/" variant="text" color="neutral">
              Home
            </ButtonLink>
          </li>
        </ol>
      </div>
    </nav>
  );
};

Navbar.displayName = 'Navbar';
export default Navbar;
