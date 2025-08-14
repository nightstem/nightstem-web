import type { Metadata } from 'next';

import { NotFound } from '@/screens/NotFound';
import { BaseLayout } from '@/components/layout/BaseLayout';

export const metadata: Metadata = {
  title: 'Page not found | Nightstem',
  robots: 'noindex',
};

export const NotFoundPage = () => {
  return (
    <BaseLayout>
      <NotFound />
    </BaseLayout>
  );
};

NotFoundPage.displayName = 'NotFoundPage';
export default NotFoundPage;
