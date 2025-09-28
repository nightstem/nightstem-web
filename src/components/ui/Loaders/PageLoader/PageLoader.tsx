import { ReactNode } from 'react';

import Logo from '@/components/ui/Logo';

export const MODE = {
  REPLACE: 'replace',
  OVERLAY: 'overlay',
} as const;

export type PageLoaderProps = {
  active?: boolean;
  message?: string;
  mode?: (typeof MODE)[keyof typeof MODE];
  children?: ReactNode;
};

const PageLoader = ({
  message,
  active = true,
  mode = MODE.REPLACE,
  children,
}: PageLoaderProps) => {
  if (!active) return <>{children}</>;

  const content = (
    <div
      role="status"
      aria-live="polite"
      className="grid justify-items-center gap-4"
    >
      <Logo mode="icon" size="display" animation="pulse" />
      <p className="text-foreground/70">{message || 'Loading...'}</p>
    </div>
  );

  if (mode === MODE.REPLACE) {
    return (
      <div
        aria-busy="true"
        className="grid h-full w-full place-items-center bg-background"
      >
        {content}
      </div>
    );
  }

  return (
    <div aria-busy="true" className="relative h-dvh w-dvw">
      <div aria-hidden="true">{children}</div>
      <div className="absolute inset-0 grid place-items-center bg-background/80 backdrop-blur-sm">
        {content}
      </div>
    </div>
  );
};

PageLoader.displayName = 'PageLoader';
export default PageLoader;
