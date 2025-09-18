import { ReactNode } from 'react';

import Navbar from '@/components/layout/Navbar';

export type BaseLayoutProps = {
  children?: ReactNode;
};

const BaseLayout = ({ children }: BaseLayoutProps) => (
  <div className="flex h-dvh w-dvw flex-col">
    <Navbar />
    <main className="screen-container h-full max-h-full overflow-auto">
      {children}
    </main>
  </div>
);

BaseLayout.displayName = 'BaseLayout';
export default BaseLayout;
