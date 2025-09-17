import type {
  LOGO_ANIMATIONS,
  LOGO_MODES,
  LOGO_SIZES,
} from '@/components/ui/Logo/constants';

export type LogoMode = (typeof LOGO_MODES)[keyof typeof LOGO_MODES];

export type LogoSize = (typeof LOGO_SIZES)[keyof typeof LOGO_SIZES];

export type LogoAnimation =
  (typeof LOGO_ANIMATIONS)[keyof typeof LOGO_ANIMATIONS];

export type LogoSizeConfig = {
  textClass: string;
  logoClass: string;
  gapClass: string;
};
