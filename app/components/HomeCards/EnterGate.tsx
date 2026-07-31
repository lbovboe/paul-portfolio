'use client';

import { useEffect, useState } from 'react';
import AnimatedIntroBanner from './AnimatedIntroBanner';

interface EnterGateProps {
  // Called once the zoom-out transition finishes, so the parent can unmount the gate
  onEnter: () => void;
}

// Full-screen splash shown before the home page. Clicking "Enter" zooms the
// banner toward the viewer and fades it out, revealing the home page underneath.
//
// Rendered inline (not portaled) so it's part of the initial server-rendered HTML and
// covers the nav bar from the very first paint - no client-only mount step, no flash of
// the nav/footer before it appears. Its z-index only needs to beat the nav bar's z-50,
// which works because `main` in the root layout no longer creates its own stacking context.
const EnterGate = ({ onEnter }: EnterGateProps) => {
  const [isExiting, setIsExiting] = useState(false);

  // Lock page scroll while the gate is up so the home page can't be scrolled behind it
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[60] transform-gpu bg-white transition-all duration-700 ease-in-out dark:bg-slate-950 ${
        isExiting ? 'pointer-events-none scale-150 opacity-0' : 'scale-100 opacity-100'
      }`}
      onTransitionEnd={(e) => {
        // transform and opacity both transition; only fire once, on the last one to finish
        if (isExiting && e.propertyName === 'opacity') {
          onEnter();
        }
      }}
    >
      <AnimatedIntroBanner onEnter={() => setIsExiting(true)} />
    </div>
  );
};

export default EnterGate;
