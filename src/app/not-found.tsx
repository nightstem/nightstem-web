import type { Metadata } from 'next';

import { NotFound } from '@/screens/NotFound';

export const metadata: Metadata = {
  title: 'Not found | Nightstem',
  robots: 'noindex',
};

export const NotFoundPage = () => {
  return <NotFound />;
};

NotFoundPage.displayName = 'NotFoundPage';
export default NotFoundPage;
