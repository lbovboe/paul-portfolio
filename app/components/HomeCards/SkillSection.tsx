import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Server, Wrench, BookOpen, Star, Sparkles, Zap } from 'lucide-react';

const SkillSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
      level: 95,
      icon: '🟨',
      description: 'Core language for web development and modern applications',
    },
    {
      name: 'Python',
      category: 'Language',
      level: 85,
      icon: '🐍',
      description: 'Versatile language for backend and data processing',
    },

    // Frontend
    {
      name: 'React.js',
      category: 'Frontend',
      level: 92,
      icon: '⚛️',
      description: 'Modern library for building interactive user interfaces',
    },
    {
      name: 'Next.js',
      category: 'Frontend',
      level: 88,
      icon: '🔺',
      description: 'Full-stack React framework with server-side rendering',
    },
    {
      name: 'Tailwind CSS',
      category: 'Frontend',
      level: 90,
      icon: '🎨',
      description: 'Utility-first CSS framework for rapid UI development',
    },
    {
      name: 'jQuery',
      category: 'Frontend',
      level: 80,
      icon: '💎',
      description: 'Classic JavaScript library for DOM manipulation',
    },

    // Backend
    {
      name: 'Node.js',
      category: 'Backend',
      level: 85,
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
      level: 88,
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
    { name: 'SQL', category: 'Database', level: 80, icon: '🗄️', description: 'Relational database query language' },
    {
      name: 'Firebase',
      category: 'Database',
      level: 78,
      icon: '🔥',
      description: 'Backend-as-a-Service platform by Google',
    },

    // Tools
    {
      name: 'Git',
      category: 'Tool',
      level: 90,
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
      level: 85,
      icon: '📮',
      description: 'API testing and development environment',
    },

    // Practices
    { name: 'Agile', category: 'Practice', level: 88, icon: '🔄', description: 'Iterative development methodology' },
    {
      name: 'CI/CD',
      category: 'Practice',
      level: 82,
      icon: '⚙️',
      description: 'Continuous integration and deployment practices',
    },
  ];

  const categories = ['All', 'Language', 'Frontend', 'Backend', 'Database', 'Tool', 'Practice'] as const;
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
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 px-4 py-16 md:py-24">
      {/* Background Elements */}
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sky-200/20 blur-3xl"></div>
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-cyan-100/10 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-100/80 px-4 py-2 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Technical Expertise</span>
          </div>

          <h1 className="mb-6 bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            Skills & Technologies
          </h1>

          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-blue-700/80">
            I am a software engineer with a passion for creating beautiful and functional web applications. I have a
            strong background in front-end development, but I am also comfortable with back-end development. I am a
            quick learner and I am always looking to expand my skills.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => {
            const IconComponent = categoryIcons[category];
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`group relative overflow-hidden rounded-full border px-6 py-3 font-medium backdrop-blur-sm transition-all duration-300 ${
                  isActive
                    ? 'border-blue-300/60 bg-white/80 text-blue-700 shadow-lg'
                    : 'border-blue-200/40 bg-blue-50/50 text-blue-600 hover:border-blue-300/50 hover:bg-white/60'
                } `}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${categoryColors[category]} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                ></div>
                <div className="relative flex items-center gap-2">
                  <IconComponent className="h-4 w-4" />
                  <span>{category}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
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
              <motion.div
                key={`${skill.name}-${activeCategory}`}
                variants={skillVariants}
                className="group relative"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="relative overflow-hidden rounded-2xl border border-blue-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition-all duration-500 hover:border-blue-300/60 hover:shadow-xl">
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${categoryColors[skill.category as Category]} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                  ></div>
                  {/* Skill Content */}
                  <div className="relative z-10">
                    {/* Icon and Name */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="text-2xl">{skill.icon}</div>
                      <div>
                        <h3 className="font-bold text-blue-900 transition-colors duration-300 group-hover:text-blue-800">
                          {skill.name}
                        </h3>
                        <span className="rounded-full bg-blue-100/60 px-2 py-1 text-xs font-medium text-blue-600">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-700">Proficiency</span>
                        <span className="text-sm font-bold text-blue-800">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-blue-100/60">
                        <motion.div
                          className={`h-2 bg-gradient-to-r ${categoryColors[skill.category as Category]} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-blue-700/80">{skill.description}</p>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-blue-400/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      animate={{
                        boxShadow:
                          hoveredSkill === skill.name
                            ? '0 0 20px rgba(59, 130, 246, 0.3)'
                            : '0 0 0px rgba(59, 130, 246, 0)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
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
          className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
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
              className="rounded-2xl border border-blue-200/50 bg-white/70 p-6 text-center backdrop-blur-xl"
            >
              <div className="mb-2 text-3xl">{stat.icon}</div>
              <motion.div
                className="mb-1 text-3xl font-bold text-blue-800"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {stat.count}+
              </motion.div>
              <div className="text-sm font-medium text-blue-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-blue-200/60 bg-blue-100/80 px-6 py-3 backdrop-blur-sm">
            <span className="text-blue-800">Ready to work together?</span>
            <a href="#contact" className="font-medium text-blue-600 transition-colors duration-300 hover:text-blue-700">
              Let's collaborate →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillSection;
