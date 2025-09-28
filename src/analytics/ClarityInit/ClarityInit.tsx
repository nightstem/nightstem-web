'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const ClarityInit = () => {
  useEffect(() => {
    const env = process.env.NODE_ENV;
    // eslint-disable-next-line no-console
    console.log({ env });
    if (!IS_PRODUCTION) return;
    const id = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (!id) return;

    Clarity.init(id);
    Clarity.consent();
  }, []);

  return null;
};

ClarityInit.displayName = 'ClarityInit';
export default ClarityInit;
