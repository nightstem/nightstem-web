import cx from 'classnames';

import LogoMark from '@/assets/svgs/LogoMark';

import type {
  LogoMode,
  LogoSize,
  LogoAnimation,
} from '@/components/ui/Logo/types';

import {
  LOGO_MODES,
  LOGO_SIZES,
  LOGO_SIZE_CONFIG,
  LOGO_ANIMATIONS,
  LOGO_ANIMATION_CONFIG,
} from '@/components/ui/Logo/constants';

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
    <LogoMark
      title={`${appName} logo`}
      decorative={mode !== LOGO_MODES.ICON}
      className={cx(
        sizeConfig.logoClass,
        animationClass,
        'motion-reduce:animate-none',
        'shrink-0',
      )}
    />
  );

  switch (mode) {
    case LOGO_MODES.HORIZONTAL: {
      return (
        <div className={cx('inline-flex items-center', sizeConfig.gapClass)}>
          {logo}
          <span className={sizeConfig.textClass}>{appName}</span>
        </div>
      );
    }

    case LOGO_MODES.ICON:
    default: {
      return <div className="inline-flex">{logo}</div>;
    }
  }
};

Logo.displayName = 'Logo';
export default Logo;
