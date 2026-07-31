'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

// The nav's links are anchors to sections on the home page (#experience, #projects, etc.)
// so they don't do anything on standalone routes like /playground - hide the nav there.
const ConditionalHeader = () => {
  const pathname = usePathname();

  if (pathname?.startsWith('/playground')) {
    return null;
  }

  return <Header />;
};

export default ConditionalHeader;
