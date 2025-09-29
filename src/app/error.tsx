'use client';

import type { Metadata } from 'next';

import Logo, {
  LOGO_ANIMATIONS,
  LOGO_MODES,
  LOGO_SIZES,
} from '@/components/ui/Logo';
import { Button } from '@/components/ui/Buttons';

export const metadata: Metadata = {
  title: 'Unexpected error | Nightstem',
  robots: 'noindex',
};

export type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ reset }: ErrorPageProps) => {
  return (
    <main className="screen-container grid h-full w-full place-items-center">
      <div
        aria-labelledby="nf-title"
        aria-describedby="nf-desc"
        className="grid w-full max-w-prose gap-8 px-6"
      >
        <header className="grid gap-2">
          <Logo
            size={LOGO_SIZES.SM}
            mode={LOGO_MODES.HORIZONTAL}
            animation={LOGO_ANIMATIONS.PULSE}
            aria-label="Nightstem"
          />

          <div className="grid gap-8" aria-live="polite" aria-atomic="true">
            <h1 id="nf-title" className="heading-lg">
              Something went wrong
            </h1>

            <p id="nf-desc" className="text-sm text-foreground/60 md:text-base">
              An unexpected error occurred. Don&apos;t worry, we&apos;re on it.
            </p>
          </div>
        </header>

        <div className="flex gap-3">
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </main>
  );
};

ErrorPage.displayName = 'ErrorPage';
export default ErrorPage;
