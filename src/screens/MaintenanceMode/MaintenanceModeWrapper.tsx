'use client';

import { ReactNode } from 'react';
import { MaintenanceMode } from '@/screens/MaintenanceMode/MaintenanceMode';

type MaintenanceModeWrapperProps = {
  children: ReactNode;
  isMaintenanceModeOn?: boolean;
};

export const MaintenanceModeWrapper = ({
  children,
  isMaintenanceModeOn = false,
}: MaintenanceModeWrapperProps) => {
  return isMaintenanceModeOn ? <MaintenanceMode /> : <>{children}</>;
};
