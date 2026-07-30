import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Server, Wrench, BookOpen, Star, Sparkles, Zap } from 'lucide-react';

const SkillSection = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');

  const skills = [
    // Languages
    {
      name: 'TypeScript',
      category: 'Language',
      level: 90,
      icon: '🔷',
      description: 'Strongly typed JavaScript for better development experience',
    },
    {
      name: 'JavaScript',
      category: 'Language',
      level: 99,
      icon: '🟨',
      description: 'Core language for web development and modern applications',
    },
    {
      name: 'Python',
      category: 'Language',
      level: 90,
      icon: '🐍',
      description: 'Versatile language for backend and data processing',
    },

    // Frontend

    {
      name: 'React.js',
      category: 'Frontend',
      level: 96,
      icon: '⚛️',
      description: 'Modern library for building interactive user interfaces',
    },
    {
      name: 'Next.js',
      category: 'Frontend',
      level: 100,
      icon: '🔺',
      description: 'Full-stack React framework with server-side rendering',
    },
    {
      name: 'Tailwind CSS',
      category: 'Frontend',
      level: 100,
      icon: '🎨',
      description: 'Utility-first CSS framework for rapid UI development',
    },
    {
      name: 'Three.js',
      category: 'Frontend',
      level: 80,
      icon: '🧊',
      description: '3D JavaScript library for creating interactive 3D graphics in the browser',
    },
    {
      name: 'WebGL',
      category: 'Frontend',
      level: 75,
      icon: '🌐',
      description: 'Web Graphics Library for rendering interactive 2D and 3D graphics',
    },
    {
      name: 'HTML',
      category: 'Frontend',
      level: 100,
      icon: '📄',
      description: 'Markup language for structuring web content',
    },
    {
      name: 'CSS',
      category: 'Frontend',
      level: 100,
      icon: '🎨',
      description: 'Style sheet language for designing web pages',
    },

    // Backend
    {
      name: 'Node.js',
      category: 'Backend',
      level: 90,
      icon: '🟢',
      description: 'JavaScript runtime for server-side development',
    },
    {
      name: 'Express.js',
      category: 'Backend',
      level: 82,
      icon: '🚀',
      description: 'Fast and minimalist web framework for Node.js',
    },
    {
      name: 'REST APIs',
      category: 'Backend',
      level: 95,
      icon: '🔗',
      description: 'RESTful web services and API design principles',
    },

    // Databases
    {
      name: 'MongoDB',
      category: 'Database',
      level: 83,
      icon: '🍃',
      description: 'NoSQL database for modern applications',
    },
    {
      name: 'Redis',
      category: 'Database',
      level: 75,
      icon: '🔴',
      description: 'In-memory data structure store for caching',
    },
    {
      name: 'SQL',
      category: 'Database',
      level: 80,
      icon: '🗄️',
      description: 'Relational database query language for backend development',
    },

    // Tools
    {
      name: 'Git',
      category: 'Tool',
      level: 95,
      icon: '🌿',
      description: 'Version control system for tracking changes',
    },
    {
      name: 'Docker',
      category: 'Tool',
      level: 70,
      icon: '🐳',
      description: 'Containerization platform for deployment',
    },
    {
      name: 'AWS',
      category: 'Tool',
      level: 75,
      icon: '☁️',
      description: 'Cloud computing services and infrastructure',
    },
    {
      name: 'Webpack',
      category: 'Tool',
      level: 72,
      icon: '📦',
      description: 'Module bundler for JavaScript applications',
    },
    {
      name: 'Postman',
      category: 'Tool',
      level: 95,
      icon: '📮',
      description: 'API testing and development environment',
    },

    // Practices
    {
      name: 'Agile',
      category: 'Practice',
      level: 88,
      icon: '🔄',
      description: 'Iterative development methodology for software development',
    },
    {
      name: 'CI/CD',
      category: 'Practice',
      level: 82,
      icon: '⚙️',
      description: 'Continuous integration and deployment practices',
    },
  ];

  const categories = ['Frontend', 'Backend', 'Database', 'Language', 'Tool', 'Practice', 'All'] as const;
  type Category = (typeof categories)[number];

  const categoryIcons: Record<Category, React.ElementType> = {
    All: Sparkles,
    Language: Code2,
    Frontend: Star,
    Backend: Server,
    Database: Database,
    Tool: Wrench,
    Practice: BookOpen,
  };

  const categoryColors: Record<Category, string> = {
    All: 'from-blue-400 to-cyan-400',
    Language: 'from-purple-400 to-pink-400',
    Frontend: 'from-blue-400 to-indigo-400',
    Backend: 'from-green-400 to-teal-400',
    Database: 'from-orange-400 to-red-400',
    Tool: 'from-gray-400 to-blue-400',
    Practice: 'from-yellow-400 to-orange-400',
  };

  const filteredSkills =
    activeCategory === 'All' ? skills : skills.filter((skill) => skill.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const skillVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="relative overflow-hidden px-4 py-12 md:py-20">
      <div className="container relative z-10 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center md:mb-16"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-100/80 px-4 py-2 backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-800/80">
            <Zap className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-slate-200">Technical Expertise</span>
          </div>

          <h2 className="mb-6 hidden bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-6xl font-bold text-transparent dark:from-cyan-200 dark:via-blue-200 dark:to-blue-100 md:block">
            Skills & Technologies
          </h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="scrollbar-hide mb-8 flex gap-3 overflow-x-auto py-4 md:justify-center"
        >
          {categories.map((category) => {
            const IconComponent = categoryIcons[category];
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`group relative shrink-0 overflow-hidden rounded-full border px-6 py-3 font-medium backdrop-blur-sm transition-all duration-300 ${
                  isActive
                    ? 'border-blue-300/60 bg-white/80 text-blue-700 shadow-lg dark:border-cyan-400/60 dark:bg-slate-900/80 dark:text-cyan-300 dark:shadow-cyan-900/30'
                    : 'border-blue-200/40 bg-blue-50/50 text-blue-600 hover:border-blue-300/50 hover:bg-white/60 dark:border-slate-700/40 dark:bg-slate-800/50 dark:text-cyan-200 dark:hover:border-cyan-400/50 dark:hover:bg-slate-900/60'
                } `}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${categoryColors[category]} opacity-0 transition-opacity duration-300 group-hover:opacity-10 dark:from-cyan-900 dark:to-blue-900`}
                ></div>
                <div className="relative flex items-center gap-2">
                  <IconComponent className="h-4 w-4" />
                  <span>{category}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-cyan-400 dark:to-blue-400"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div key={`${skill.name}-${activeCategory}`} variants={skillVariants} className="group relative">
                <div className="relative h-full overflow-hidden rounded-2xl border border-blue-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition-all duration-500 dark:border-slate-700/50 dark:bg-slate-900/70">
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${categoryColors[skill.category as Category]} opacity-0 transition-opacity duration-500 group-hover:opacity-10 dark:from-cyan-900 dark:to-blue-900`}
                  ></div>
                  {/* Skill Content */}
                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Icon and Name */}
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{skill.icon}</div>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-blue-900 transition-colors duration-300 group-hover:text-blue-800 dark:text-cyan-200 dark:group-hover:text-cyan-100">
                          {skill.name}
                        </h3>
                        <span className="rounded-full bg-blue-100/60 px-2 py-1 text-xs font-medium text-blue-600 dark:bg-slate-800/60 dark:text-cyan-300">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-700 dark:text-cyan-200">Proficiency</span>
                        <span className="text-sm font-bold text-blue-800 dark:text-cyan-100">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100/60 dark:bg-slate-800/60">
                        <motion.div
                          className={`h-2 w-full origin-left bg-gradient-to-r ${categoryColors[skill.category as Category]} rounded-full dark:from-cyan-700 dark:to-blue-700`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: skill.level / 100 }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-blue-700/80 dark:text-slate-300/80">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 hidden grid-cols-2 gap-6 md:grid md:grid-cols-4"
        >
          {[
            { label: 'Languages', count: skills.filter((s) => s.category === 'Language').length, icon: '💻' },
            { label: 'Frontend', count: skills.filter((s) => s.category === 'Frontend').length, icon: '🎨' },
            { label: 'Backend', count: skills.filter((s) => s.category === 'Backend').length, icon: '⚡' },
            {
              label: 'Tools',
              count:
                skills.filter((s) => s.category === 'Tool').length +
                skills.filter((s) => s.category === 'Database').length +
                skills.filter((s) => s.category === 'Practice').length,
              icon: '🛠️',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-blue-200/50 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70"
            >
              <div className="mb-2 text-3xl">{stat.icon}</div>
              <motion.div
                className="mb-1 text-3xl font-bold text-blue-800 dark:text-cyan-200"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {stat.count}+
              </motion.div>
              <div className="text-sm font-medium text-blue-600 dark:text-cyan-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillSection;
