'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

const ClarityInit = () => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({ env: process.env.NEXT_PUBLIC_ENVIRONMENT });
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
