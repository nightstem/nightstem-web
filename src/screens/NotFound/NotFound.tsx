'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import Logo, {
  LOGO_ANIMATIONS,
  LOGO_MODES,
  LOGO_SIZES,
} from '@/components/ui/Logo';

import randomInt from '@/utils/randomInt';
import hashIndex from '@/utils/hashIndex';

import {
  type NotFoundPhrase,
  defaultNotFound,
  notFoundList,
} from '@/screens/NotFound/constants';
import Kbd from '@/components/ui/Kbd';
import { Button, LinkButton } from '@/components/ui/Buttons';

export type NotFoundProps = {
  notFoundPhrases?: NotFoundPhrase[];
};

const NotFound = ({ notFoundPhrases = notFoundList }: NotFoundProps) => {
  const pathname = usePathname() ?? '/404';
  const router = useRouter();

  const [index, setIndex] = useState(() =>
    hashIndex(pathname, notFoundPhrases.length),
  );
  const shuffle = useCallback(() => {
    if (notFoundPhrases.length <= 1) return;
    let next = randomInt(notFoundPhrases.length);
    if (next === index) next = (next + 1) % notFoundPhrases.length;
    setIndex(next);
  }, [index, notFoundPhrases.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') shuffle();
      if (e.key === 'Escape') router.push('/');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shuffle, router]);

  const { title, description } = notFoundPhrases[index] ?? defaultNotFound;

  return (
    <main className="screen-container grid h-full w-full place-items-center">
      <h1 className="sr-only">Page not found</h1>

      <section
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
            <h2 id="nf-title" className="heading-lg">
              {title}
            </h2>

            <p id="nf-desc" className="text-sm text-foreground/60 md:text-base">
              {description}
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-6">
          <div className="flex gap-3">
            <LinkButton href="/">Go home</LinkButton>
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

          <div className="flex items-center gap-1.5 border-t border-foreground/10 pt-3 text-caption text-foreground/60">
            <span>Tip: press</span>
            <Kbd>Esc</Kbd>
            <span>to go home</span>
            <span>•</span>
            <Kbd>R</Kbd>
            <span>to shuffle</span>
          </div>
        </div>
      </section>
    </main>
  );
};

NotFound.displayName = 'NotFound';
export default NotFound;
