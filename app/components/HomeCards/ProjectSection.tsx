import { useState, useEffect, useRef } from 'react';
import { Zap, ChevronRight, ChevronLeft, Eye, ArrowUpRight, Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperRef } from 'swiper/react';
import 'swiper/css';
import { projects, type Project } from '../../constants/projectsData';

const ProjectSection = () => {
  // Swiper section
  const [activeIdx, setActiveIdx] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    const swiperInstance = swiperRef?.current?.swiper;
    if (swiperInstance) {
      swiperInstance.on('slideChange', handleSlideChange);
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.off('slideChange', handleSlideChange);
      }
    };
  }, []);

  const handleNextClick = () => {
    const swiperInstance = swiperRef?.current?.swiper;
    if (swiperInstance) {
      const currentIndex = swiperInstance.activeIndex;
      const slidesCount = swiperInstance.slides.length;
      if (currentIndex === slidesCount - 1) {
        swiperInstance.slideToLoop(0);
      } else {
        swiperInstance.slideNext();
      }
    }
  };

  const handlePrevClick = () => {
    const swiperInstance = swiperRef?.current?.swiper;
    if (swiperInstance) {
      const currentIndex = swiperInstance.activeIndex;
      const slidesCount = swiperInstance.slides.length;
      if (currentIndex === 0) {
        swiperInstance.slideToLoop(slidesCount - 1);
      } else {
        swiperInstance.slidePrev();
      }
    }
  };

  const handleSlideChange = () => {
    const swiperInstance = swiperRef?.current?.swiper;
    if (swiperInstance) {
      const currentIndex = swiperInstance.realIndex;
      setActiveIdx(currentIndex);
    }
  };

  // End of swiper section
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [isTruncated, setIsTruncated] = useState<boolean[]>([]);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  /**
   * CLICKABLE CARD FEATURE
   * Handles clicking on the entire project card to redirect to the project URL.
   * Opens the link in a new tab to preserve user's current browsing session.
   * This function is called when user clicks anywhere on the card EXCEPT:
   * - The "Read more" button (uses stopPropagation to prevent card click)
   * - The floating action button (uses stopPropagation to prevent double navigation)
   * - The navigation buttons (uses stopPropagation to prevent card click)
   */
  const handleCardClick = (projectUrl: string) => {
    window.open(projectUrl, '_blank', 'noopener,noreferrer');
  };

  /**
   * CONDITIONAL READ MORE FEATURE
   * Detects if text descriptions actually exceed 3 lines and need a "Read more" button.
   * How it works:
   * 1. Compares scrollHeight (total content height) with clientHeight (visible height)
   * 2. When line-clamp-3 is applied and content exceeds 3 lines, scrollHeight > clientHeight
   * 3. Only shows "Read more" button for descriptions that are actually truncated
   * 4. Prevents unnecessary buttons for short descriptions that fit in 3 lines
   */
  const checkTruncation = () => {
    const truncatedStates = descriptionRefs.current.map((ref) => {
      if (!ref) return false;
      return ref.scrollHeight > ref.clientHeight;
    });
    setIsTruncated(truncatedStates);
  };

  useEffect(() => {
    // Check truncation after content loads
    const timer = setTimeout(checkTruncation, 100);

    // Check on window resize
    const handleResize = () => {
      setTimeout(checkTruncation, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [projects]);

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
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="animate-fade-in text-center md:mb-10">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-blue-200/60 bg-white/70 px-6 py-3 shadow-lg backdrop-blur-xl dark:border-blue-700/60 dark:bg-slate-800/80">
            <Sparkles className="h-5 w-5 text-blue-500 dark:text-cyan-300" />
            <span className="text-sm font-medium text-blue-700 dark:text-slate-200">Featured Projects</span>
            <div className="h-2 w-2 rounded-full bg-blue-400 dark:bg-cyan-400"></div>
          </div>

          <h2 className="hidden bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-6xl font-bold text-transparent dark:from-cyan-200 dark:via-blue-200 dark:to-blue-100 md:block">
            Personal Masterpieces
          </h2>
        </div>

        <Swiper spaceBetween={0} slidesPerView={1} ref={swiperRef} loop={true} onSlideChange={handleSlideChange}>
          {projects !== undefined &&
            projects !== null &&
            projects.length > 0 &&
            projects.map((project, index) => {
              const accentColors = getAccentColors(project.accentColor);
              return (
                <SwiperSlide key={`img-${index}`} className="cursor-pointer">
                  <div key={index} className="group relative xl:mx-24">
                    {/* Main Card - CLICKABLE CARD FEATURE
                        The entire card is clickable and redirects to the project URL.
                        Event bubbling allows clicks anywhere on the card to trigger navigation,
                        except for elements that use stopPropagation() to prevent it.
                    */}
                    <div
                      className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-blue-200/50 bg-white/80 backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-blue-300/60 group-hover:bg-white/90 dark:border-slate-700/50 dark:bg-slate-900/80 dark:group-hover:border-cyan-400/60 dark:group-hover:bg-slate-900/90"
                      onClick={() => handleCardClick(project.projectUrl)}
                    >
                      {/* Image Section */}
                      <div className="relative h-80 overflow-hidden lg:h-96">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent"></div>

                        {/* Navigation Buttons */}
                        {projects.length > 1 && (
                          <>
                            {/* Previous Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePrevClick();
                              }}
                              className="group/nav absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                              aria-label="Previous project"
                            >
                              <ChevronLeft className="h-5 w-5 text-white transition-transform duration-300 group-hover/nav:-translate-x-0.5" />
                            </button>

                            {/* Next Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNextClick();
                              }}
                              className="group/nav absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                              aria-label="Next project"
                            >
                              <ChevronRight className="h-5 w-5 text-white transition-transform duration-300 group-hover/nav:translate-x-0.5" />
                            </button>
                          </>
                        )}

                        {/* Floating Action Button - CLICKABLE CARD FEATURE
                            Uses stopPropagation() to prevent triggering the card click when clicked.
                            This ensures users can click the button without also triggering card navigation.
                        */}
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`absolute right-6 top-6 rounded-full border ${accentColors.border} ${accentColors.bg} p-3 shadow-lg backdrop-blur-xl transition-all duration-300 ${accentColors.hover} group/btn hover:scale-110`}
                        >
                          <ArrowUpRight
                            className={`h-5 w-5 ${accentColors.text} transition-transform duration-300 group-hover/btn:rotate-12`}
                          />
                        </a>

                        {/* Status Badge */}
                        <div className="absolute bottom-6 left-6">
                          <span
                            className={`rounded-full border px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-xl ${getStatusColor(project.status)}`}
                          >
                            <div className="mr-2 inline-block h-2 w-2 rounded-full bg-current"></div>
                            {project.status}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="relative flex-1 p-8 lg:p-10">
                        {/* Header */}
                        <div className="mb-6">
                          <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-cyan-200 lg:text-3xl">
                              {project.title}
                            </h3>
                            <Eye
                              className={`h-5 w-5 ${accentColors.text} opacity-0 transition-all duration-300 group-hover:opacity-100`}
                            />
                          </div>
                          <p className={`text-sm font-medium ${accentColors.text}`}>{project.category}</p>
                        </div>

                        {/* Description */}
                        <div className="mb-8 flex-1">
                          <p
                            ref={(el) => {
                              descriptionRefs.current[index] = el;
                            }}
                            className={`leading-relaxed text-slate-600 dark:text-slate-300 ${!expandedCards.includes(index) ? 'line-clamp-3' : ''}`}
                          >
                            {project.description}
                          </p>

                          {/* CONDITIONAL READ MORE FEATURE
                              Only show "Read more" button when text actually exceeds 3 lines.
                              isTruncated[index] is true when scrollHeight > clientHeight for this description.
                          */}
                          {isTruncated[index] && (
                            <button
                              onClick={(e) => {
                                // CLICKABLE CARD FEATURE - stopPropagation prevents card click
                                // This ensures "Read more" only toggles text, doesn't navigate to project
                                e.stopPropagation();
                                toggleCard(index);
                              }}
                              className={`group/read mt-4 inline-flex items-center gap-2 text-sm font-medium ${accentColors.text} transition-all duration-300 hover:translate-x-1 hover:text-slate-800 dark:hover:text-cyan-100`}
                            >
                              {expandedCards.includes(index) ? 'Show less' : 'Read more'}
                              <ChevronRight
                                className={`h-4 w-4 transition-transform duration-300 ${expandedCards.includes(index) ? 'rotate-90' : 'group-hover/read:translate-x-1'}`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Technologies */}
                        {project.technologies && (
                          <div className="hidden space-y-4 md:block">
                            <div className={`flex items-center gap-2 ${accentColors.text}`}>
                              <Zap className="h-4 w-4" />
                              <span className="text-sm font-medium">Tech Arsenal</span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="rounded-full border border-blue-200/60 bg-blue-50/80 px-4 py-2 text-xs font-medium text-blue-500 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-blue-300/60 hover:bg-blue-100/80 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/80 dark:text-cyan-200 dark:hover:border-cyan-400/60 dark:hover:bg-slate-900/80"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </section>
  );
};

export default ProjectSection;

<style jsx>{`
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.8s ease-out forwards;
    opacity: 0;
  }

  .animate-slide-up {
    animation: slide-up 0.8s ease-out forwards;
    opacity: 0;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`}</style>;
