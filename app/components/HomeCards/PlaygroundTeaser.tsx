import Link from 'next/link';
import { Box, ArrowUpRight } from 'lucide-react';

const PlaygroundTeaser = () => {
  return (
    <section className="relative overflow-hidden px-4 py-12 md:py-20">
      <div className="container relative z-10 mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-blue-200/50 bg-white/70 p-8 text-center shadow-lg backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70 md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-100/80 px-4 py-2 backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-800/80">
            <Box className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-slate-200">Interactive 3D Playground</span>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 dark:text-cyan-200 md:text-3xl">
            Explore an Interactive 3D Model
          </h3>

          <p className="max-w-xl text-slate-600 dark:text-slate-300">
            Rotate, zoom, and pan a GLB model rendered with Three.js and React Three Fiber, on its own dedicated
            page.
          </p>

          <Link
            href="/playground"
            className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400"
          >
            Try the 3D Playground
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PlaygroundTeaser;
