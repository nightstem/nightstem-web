'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

const ClarityInit = () => {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_CLARITY_ID;
    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction || !id) return;

    Clarity.init(id);
    Clarity.consent();
  }, []);

  return null;
};

ClarityInit.displayName = 'ClarityInit';
export default ClarityInit;
