export const FEATURE_FLAGS = {
  'maintenance:global': false,
} as const;

export type FeatureFlagKey = keyof typeof FEATURE_FLAGS;

export type FeatureFlagValues = {
  [K in FeatureFlagKey]: (typeof FEATURE_FLAGS)[K];
};
