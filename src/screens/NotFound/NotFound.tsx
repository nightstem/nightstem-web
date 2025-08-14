'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

import Logo, {
  LOGO_ANIMATIONS,
  LOGO_MODES,
  LOGO_SIZES,
} from '@/components/Logo';

import randomInt from '@/utils/randomInt';
import hashIndex from '@/utils/hashIndex';

import {
  defaultNotFound,
  notFoundList,
  type NotFoundPhrase,
} from '@/screens/NotFound/constants';
import Kbd from '@/components/Kbd';
import Button from '@/components/Button';

export type NotFoundProps = {
  notFoundPhrases?: NotFoundPhrase[];
};

export const NotFound = ({ notFoundPhrases = notFoundList }: NotFoundProps) => {
  const pathname = usePathname() ?? '/404';
  const router = useRouter();

  const [index, setIndex] = useState(() =>
    hashIndex(pathname, notFoundPhrases.length),
  );

  const shuffle = useCallback(
    () => setIndex(randomInt(notFoundPhrases.length)),
    [notFoundPhrases.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'r':
        case 'R':
          shuffle();
          break;

        case 'Escape':
          router.push('/');
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shuffle, router]);

  const goHome = () => {
    router.push('/');
  };

  const { title, description } = notFoundPhrases[index] ?? defaultNotFound;

  return (
    <main className="min-h-dvh w-dvw grid place-items-center overflow-hidden">
      <article
        aria-labelledby="nf-title"
        className="grid gap-6 w-full max-w-[64ch] px-4"
      >
        <header className="grid gap-4 w-full">
          <Logo
            size={LOGO_SIZES.SM}
            mode={LOGO_MODES.HORIZONTAL}
            animation={LOGO_ANIMATIONS.PULSE}
            aria-label="Nightstem"
          />

          <h1 id="nf-title" className="heading-lg">
            {title}
          </h1>
        </header>

        <div className="flex flex-col gap-12">
          <p className="text-neutral-400">{description}</p>

          <div className="w-full flex flex-col gap-4">
            <div className="flex gap-3">
              <Button variant="outlined" onClick={goHome}>
                Go home
              </Button>

              <Button
                onClick={shuffle}
                variant="ghost"
                color="neutral"
                aria-label="Show another message (press R)"
                title="Shuffle (R)"
              >
                Shuffle
              </Button>
            </div>

            <div className="flex gap-1 text-caption text-neutral-400">
              <span>Tip: press</span>

              <span className="flex gap-1">
                <Kbd>Esc</Kbd>
                <span>to go home</span>
              </span>

              <span>{'\u2022'}</span>

              <span className="flex gap-1">
                <Kbd>R</Kbd>
                <span> to shuffle</span>
              </span>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

NotFound.displayName = 'NotFound';
export default NotFound;
