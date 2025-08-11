import cx from 'classnames';

import {
  LOGO_MODES,
  LOGO_SIZES,
  LOGO_SIZE_CONFIG,
  LOGO_ANIMATIONS,
  LOGO_ANIMATION_CONFIG,
} from '@/components/Logo/constants';
import LogoImage from '@/assets/images/core/logo.webp';
import type {
  LogoMode,
  LogoSize,
  LogoAnimation,
} from '@/components/Logo/types';

export type LogoProps = {
  mode?: LogoMode;
  size?: LogoSize;
  animation?: LogoAnimation;
};

export const Logo = ({
  mode = LOGO_MODES.ICON,
  size = LOGO_SIZES.BODY,
  animation = LOGO_ANIMATIONS.NONE,
}: LogoProps) => {
  const appName = 'Nightstem';
  const sizeConfig = LOGO_SIZE_CONFIG[size];
  const animationClass = LOGO_ANIMATION_CONFIG[animation];

  const logo = (
    <img
      src={LogoImage.src}
      alt={`${appName} icon`}
      className={cx('object-contain', sizeConfig.logoClass, animationClass)}
    />
  );

  switch (mode) {
    case LOGO_MODES.FULL: {
      return (
        <div
          className={cx(
            'inline-flex flex-col text-center items-end leading-none',
          )}
        >
          {logo}
          <span className={sizeConfig.textClass}>{appName}</span>
        </div>
      );
    }

    case LOGO_MODES.HORIZONTAL: {
      return (
        <div
          className={cx(
            'inline-flex items-center leading-none',
            sizeConfig.gapClass,
          )}
        >
          {logo}
          <span className={sizeConfig.textClass}>{appName}</span>
        </div>
      );
    }

    case LOGO_MODES.ICON:
    default: {
      return <div className={cx('inline-flex')}>{logo}</div>;
    }
  }
};

Logo.displayName = 'Logo';
export default Logo;
