'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

const ClarityInit = () => {
  useEffect(() => {
    if (!IS_PRODUCTION) return;

    const id = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (!id) return;

    Clarity.init(id);
    Clarity.consent();
  }, []);

  return null;
};

export default ClarityInit;
