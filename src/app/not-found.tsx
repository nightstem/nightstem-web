import type { Metadata } from 'next';

import NotFound from '@/screens/NotFound';

export const metadata: Metadata = {
  title: 'Not found | Nightstem',
  robots: 'noindex',
};

const NotFoundPage = () => <NotFound />;

NotFoundPage.displayName = 'NotFoundPage';
export default NotFoundPage;
