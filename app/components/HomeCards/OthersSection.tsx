import { motion } from 'framer-motion';
import { Boxes } from 'lucide-react';
import PlaygroundTeaser from './PlaygroundTeaser';

const OthersSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-20">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/30 bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
            <Boxes className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-white">More to Explore</span>
          </div>
          <h2 className="mb-6 hidden bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-6xl font-bold text-transparent dark:from-cyan-200 dark:via-blue-200 dark:to-blue-100 md:block">
            Others
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            A few extra things worth a look beyond the core portfolio.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <PlaygroundTeaser />
        </motion.div>
      </div>
    </section>
  );
};

export default OthersSection;
