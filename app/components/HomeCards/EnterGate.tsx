'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AnimatedIntroBanner from './AnimatedIntroBanner';

interface EnterGateProps {
  // Called once the zoom-out transition finishes, so the parent can unmount the gate
  onEnter: () => void;
}

// Full-screen splash shown before the home page. Clicking "Enter" zooms the
// banner toward the viewer and fades it out, revealing the home page underneath.
//
// Rendered via a portal directly into <body>: `main` in the root layout has its own
// `position: relative; z-index: 10`, which creates a stacking context. Any z-index inside
// it - no matter how high - is capped at that level, so it can never paint above the nav
// bar's z-50 (which lives outside `main`, in the Header). Portaling escapes that context.
const EnterGate = ({ onEnter }: EnterGateProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Lock page scroll while the gate is up so the home page can't be scrolled behind it
  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[200] transform-gpu bg-white transition-all duration-700 ease-in-out dark:bg-slate-950 ${
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
    </div>,
    document.body
  );
};

export default EnterGate;
