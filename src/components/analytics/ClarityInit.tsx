'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

const ClarityInit = () => {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (process.env.NODE_ENV !== 'production' || !id) return;

    Clarity.init(id);
    Clarity.consent(true);
  }, []);

  return null;
};

ClarityInit.displayName = 'ClarityInit';
export default ClarityInit;
