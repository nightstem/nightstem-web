import { NotFound } from '@/screens/NotFound';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found | Nightstem',
  robots: 'noindex',
};

export const NotFoundPage = () => {
  return <NotFound />;
};

NotFoundPage.displayName = 'NotFoundPage';
export default NotFoundPage;
