'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// HACK: see https://github.com/vercel/next.js/issues/42991
export default function InvalidateCache() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <></>;
}
