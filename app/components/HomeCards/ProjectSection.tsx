import { motion } from 'framer-motion';
import { Zap, Eye, ArrowUpRight, Sparkles } from 'lucide-react';
import { projects } from '../../constants/projectsData';

const ProjectSection = () => {
  /**
   * CLICKABLE CARD FEATURE
   * Handles clicking on the entire project card to redirect to the project URL.
   * Opens the link in a new tab to preserve user's current browsing session.
   * This function is called when user clicks anywhere on the card EXCEPT
   * the floating action button, which uses stopPropagation to prevent double navigation.
   */
  const handleCardClick = (projectUrl: string) => {
    window.open(projectUrl, '_blank', 'noopener,noreferrer');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/60';
      case 'In Development':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700/60';
      case 'Completed':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/60';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800/30 dark:text-slate-300 dark:border-slate-700/60';
    }
  };

  const getAccentColors = (color: string) => {
    const colors = {
      blue: {
        text: 'text-blue-600 dark:text-blue-300',
        bg: 'bg-blue-50 dark:bg-blue-900/40',
        border: 'border-blue-200 dark:border-blue-700/60',
        hover: 'hover:bg-blue-100 dark:hover:bg-blue-800/60',
      },
      cyan: {
        text: 'text-cyan-600 dark:text-cyan-300',
        bg: 'bg-cyan-50 dark:bg-cyan-900/40',
        border: 'border-cyan-200 dark:border-cyan-700/60',
        hover: 'hover:bg-cyan-100 dark:hover:bg-cyan-800/60',
      },
      indigo: {
        text: 'text-indigo-600 dark:text-indigo-300',
        bg: 'bg-indigo-50 dark:bg-indigo-900/40',
        border: 'border-indigo-200 dark:border-indigo-700/60',
        hover: 'hover:bg-indigo-100 dark:hover:bg-indigo-800/60',
      },
      purple: {
        text: 'text-purple-600 dark:text-purple-300',
        bg: 'bg-purple-50 dark:bg-purple-900/40',
        border: 'border-purple-200 dark:border-purple-700/60',
        hover: 'hover:bg-purple-100 dark:hover:bg-purple-800/60',
      },
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  // Cap visible tech tags so every card's tag row takes the same amount of space
  const MAX_VISIBLE_TECHS = 5;

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-20">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-blue-200/60 bg-white/70 px-6 py-3 shadow-lg backdrop-blur-xl dark:border-blue-700/60 dark:bg-slate-800/80 md:px-8 md:py-4">
            <Sparkles className="h-5 w-5 flex-shrink-0 text-blue-500 dark:text-cyan-300 md:h-7 md:w-7" />
            <h2 className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-xl font-bold text-transparent dark:from-cyan-200 dark:via-blue-200 dark:to-blue-100 md:text-4xl">
              Personal Projects
            </h2>
          </div>
        </div>

        {/* Project Grid - equal-height cards, aligned to the same width as the Experience section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {projects.map((project, index) => {
            const accentColors = getAccentColors(project.accentColor);
            const visibleTechs = project.technologies?.slice(0, MAX_VISIBLE_TECHS) ?? [];
            const extraTechCount = (project.technologies?.length ?? 0) - visibleTechs.length;

            return (
              <motion.div
                key={project.title}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.15, ease: 'easeOut' }}
              >
                {/* Main Card - CLICKABLE CARD FEATURE
                    The entire card is clickable and redirects to the project URL.
                    Event bubbling allows clicks anywhere on the card to trigger navigation,
                    except for the floating action button, which uses stopPropagation.
                */}
                <div
                  className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-blue-200/50 bg-white/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-300/60 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-500/20 dark:border-slate-700/50 dark:bg-slate-900/80 dark:hover:border-cyan-400/60 dark:hover:bg-slate-900/90 dark:hover:shadow-cyan-500/20"
                  onClick={() => handleCardClick(project.projectUrl)}
                >
                  {/* Image Section - fixed aspect ratio so every card matches */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay - darkens further on hover to host the reveal CTA */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent transition-colors duration-500 group-hover:from-slate-900/80" />

                    {/* Hover reveal CTA - the interactive "catch attention" moment */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="translate-y-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0">
                        View Project →
                      </span>
                    </div>

                    {/* Floating Action Button - CLICKABLE CARD FEATURE
                      Uses stopPropagation() to prevent triggering the card click when clicked.
                      This ensures users can click the button without also triggering card navigation.
                    */}
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute right-4 top-4 rounded-full border ${accentColors.border} ${accentColors.bg} p-2.5 shadow-lg backdrop-blur-xl transition-all duration-300 ${accentColors.hover} group/btn hover:scale-110`}
                    >
                      <ArrowUpRight
                        className={`h-4 w-4 ${accentColors.text} transition-transform duration-300 group-hover/btn:rotate-12`}
                      />
                    </a>

                    {/* Status Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur-xl ${getStatusColor(project.status)}`}
                      >
                        <div className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current"></div>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-cyan-200 lg:text-2xl">
                          {project.title}
                        </h3>
                        <Eye
                          className={`h-5 w-5 flex-shrink-0 ${accentColors.text} opacity-0 transition-all duration-300 group-hover:opacity-100`}
                        />
                      </div>
                      <p className={`text-sm font-medium ${accentColors.text}`}>{project.category}</p>
                    </div>

                    {/* Description - always capped to 3 lines so every card stays the same height */}
                    <p className="mb-6 line-clamp-3 leading-relaxed text-slate-600 dark:text-slate-300">
                      {project.description}
                    </p>

                    {/* Technologies - capped count keeps this row consistent across cards */}
                    {project.technologies && (
                      <div className="mt-auto space-y-3">
                        <div className={`flex items-center gap-2 ${accentColors.text}`}>
                          <Zap className="h-4 w-4" />
                          <span className="text-sm font-medium">Tech Arsenal</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {visibleTechs.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="rounded-full border border-blue-200/60 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-500 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/60 hover:bg-blue-100/80 dark:border-slate-700/60 dark:bg-slate-800/80 dark:text-cyan-200 dark:hover:border-cyan-400/60 dark:hover:bg-slate-900/80"
                            >
                              {tech}
                            </span>
                          ))}
                          {extraTechCount > 0 && (
                            <span className="rounded-full border border-blue-200/60 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-500 shadow-sm backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-800/80 dark:text-cyan-200">
                              +{extraTechCount} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
