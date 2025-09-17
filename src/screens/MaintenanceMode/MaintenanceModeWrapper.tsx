'use client';

import { ReactNode } from 'react';
import { MaintenanceMode } from './MaintenanceMode';

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
