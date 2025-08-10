import type { LOGO_MODES, LOGO_SIZES, LOGO_ANIMATIONS } from './constants';

export type LogoMode = (typeof LOGO_MODES)[keyof typeof LOGO_MODES];

export type LogoSize = (typeof LOGO_SIZES)[keyof typeof LOGO_SIZES];

export type LogoAnimation =
  (typeof LOGO_ANIMATIONS)[keyof typeof LOGO_ANIMATIONS];

export type LogoSizeConfig = {
  textClass: string;
  logoClass: string;
  gapClass: string;
};
