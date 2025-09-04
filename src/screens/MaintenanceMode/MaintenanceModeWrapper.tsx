'use client';

import { ReactNode } from 'react';
import { MaintenanceMode } from './MaintenanceMode';
import { useFeatureFlag } from '@/contexts/FeatureFlagContext';

interface MaintenanceModeWrapperProps {
  children: ReactNode;
}

export const MaintenanceModeWrapper = ({
  children,
}: MaintenanceModeWrapperProps) => {
  const [isMaintenanceMode, isReady] = useFeatureFlag('maintenance:global');

  if (!isReady) {
    return (
      <div className="min-h-dvh w-full grid place-items-center">
        <div className="animate-pulse text-foreground/60">Loading...</div>
      </div>
    );
  }

  return isMaintenanceMode ? <MaintenanceMode /> : <>{children}</>;
};
