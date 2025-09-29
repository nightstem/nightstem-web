import { PageLoader } from '@/components/ui/Loaders';

const LoadingPage = () => (
  <main className="h-full w-full">
    <PageLoader />
  </main>
);

LoadingPage.displayName = 'LoadingPage';
export default LoadingPage;
