import { motion } from 'framer-motion';
import { Boxes } from 'lucide-react';
import PlaygroundTeaser from './PlaygroundTeaser';

const OthersSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-20">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-200/30 bg-blue-500/10 px-6 py-3 backdrop-blur-sm md:px-8 md:py-4">
            <Boxes className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-cyan-400 md:h-7 md:w-7" />
            <h2 className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-xl font-bold text-transparent dark:from-cyan-200 dark:via-blue-200 dark:to-blue-100 md:text-4xl">
              Others
            </h2>
          </div>
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
