export const LOGO_MODES = {
  ICON: 'ICON',
  HORIZONTAL: 'HORIZONTAL',
  FULL: 'FULL',
} as const;

export const LOGO_SIZES = {
  DISPLAY: 'display',
  XXL: 'xxl',
  XL: 'xl',
  LG: 'lg',
  MD: 'md',
  SM: 'sm',
  BODY: 'body',
  CAPTION: 'caption',
  HINT: 'hint',
} as const;

export const LOGO_ANIMATIONS = {
  NONE: 'none',
  PULSE: 'pulse',
} as const;

export const LOGO_ANIMATION_CONFIG = {
  [LOGO_ANIMATIONS.NONE]: '',
  [LOGO_ANIMATIONS.PULSE]: 'animate-pulse',
} as const;

export const LOGO_SIZE_CONFIG = {
  [LOGO_SIZES.DISPLAY]: {
    textClass: 'heading-display',
    logoClass: 'h-20 w-20', // ~76px for 5.61rem
    gapClass: 'gap-4',
  },
  [LOGO_SIZES.XXL]: {
    textClass: 'heading-xxl',
    logoClass: 'h-14 w-14', // ~57px for 4.209rem
    gapClass: 'gap-3',
  },
  [LOGO_SIZES.XL]: {
    textClass: 'heading-xl',
    logoClass: 'h-11 w-11', // ~43px for 3.157rem
    gapClass: 'gap-3',
  },
  [LOGO_SIZES.LG]: {
    textClass: 'heading-lg',
    logoClass: 'h-8 w-8', // 32px for 2.369rem (matches MaintenanceMode)
    gapClass: 'gap-3',
  },
  [LOGO_SIZES.MD]: {
    textClass: 'heading-md',
    logoClass: 'h-6 w-6', // ~24px for 1.777rem
    gapClass: 'gap-2',
  },
  [LOGO_SIZES.SM]: {
    textClass: 'heading-sm',
    logoClass: 'h-[18px] w-[18px]', // ~18px for 1.333rem
    gapClass: 'gap-2',
  },
  [LOGO_SIZES.BODY]: {
    textClass: 'text-body',
    logoClass: 'h-[14px] w-[14px]', // ~14px for 1rem
    gapClass: 'gap-2',
  },
  [LOGO_SIZES.CAPTION]: {
    textClass: 'text-caption',
    logoClass: 'h-[10px] w-[10px]', // ~10px for 0.75rem
    gapClass: 'gap-1',
  },
  [LOGO_SIZES.HINT]: {
    textClass: 'text-hint',
    logoClass: 'h-2 w-2', // ~8px for 0.563rem
    gapClass: 'gap-1',
  },
} as const;
