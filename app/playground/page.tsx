import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import GLBTestComponent from '@/app/components/tools/GLBTestComponent';

export const metadata: Metadata = {
  title: '3D Playground | Jianbo (Paul)',
  description: 'Interactive 3D model playground built with Three.js and React Three Fiber',
};

const PlaygroundPage = () => {
  return (
    <div className="relative">
      <Link
        href="/"
        className="absolute left-4 top-24 z-20 flex items-center gap-2 rounded-full border border-blue-200/50 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 hover:bg-white dark:border-slate-700/50 dark:bg-slate-900/80 dark:text-cyan-200 dark:hover:bg-slate-900 lg:left-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Portfolio
      </Link>
      <GLBTestComponent />
    </div>
  );
};

export default PlaygroundPage;
