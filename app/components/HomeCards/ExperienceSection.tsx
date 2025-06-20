import React, { useState, useRef } from 'react';
import { Calendar, MapPin, ExternalLink, ChevronRight, Briefcase, Award, TrendingUp } from 'lucide-react';

interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
  type: 'full-time' | 'contract' | 'internship' | 'freelance';
}

const ExperienceSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const experiences: Experience[] = [
    {
      id: 1,
      company: 'Greywolf Networks Pte Ltd',
      position: 'Frontend Developer',
      duration: 'May 2024 - Present',
      location: 'Singapore, Singapore',
      description:
        'Crafting seamless, high-performance web applications with React, Next.js, and TypeScript. Focused on intuitive UI, responsive design, and delivering exceptional user experiences through collaboration and modern best practices.',
      achievements: [
        'Developed and launched multiple responsive web applications with React.js/Next.js',
        'Optimized application performance and ensured cross-browser compatibility',
        'Collaborated with cross-functional teams to deliver business requirements',
      ],
      technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
      type: 'full-time',
    },
    {
      id: 2,
      company: 'The Lab Singapore',
      position: 'Full-stack Developer',
      duration: 'Feb 2022 - May 2024',
      location: 'Singapore, Singapore',
      description:
        'Engineered and enhanced an education platform, building robust features and ensuring smooth integration between front-end and back-end. Dedicated to scalable solutions and continuous product improvement.',
      achievements: [
        'Designed and implemented new features for the education system',
        'Optimized existing functionalities for better performance and scalability',
        'Ensured seamless integration between front-end and back-end components',
      ],
      technologies: ['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Express', 'Tailwind CSS'],
      type: 'full-time',
    },
  ];

  const cardRef = (element: HTMLDivElement | null, id: number) => {
    if (element && observerRef.current) {
      element.setAttribute('data-card-id', id.toString());
      observerRef.current.observe(element);
    }
  };

  const getTypeColor = (type: Experience['type']) => {
    const colors = {
      'full-time':
        'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/60',
      contract: 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-700/60',
      internship:
        'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-700/60',
      freelance:
        'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/60',
    };
    return colors[type];
  };

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-20">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/30 bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
            <Briefcase className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600 dark:text-white">Professional Journey</span>
          </div>
          <h2 className="mb-6 hidden bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-6xl font-bold text-transparent dark:from-cyan-200 dark:via-blue-200 dark:to-blue-100 md:block">
            Experience
          </h2>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed dark:text-slate-200">
            A timeline of my professional growth, key achievements, and the technologies that have shaped my career
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line - Always on left */}
          <div className="absolute bottom-0 left-1/2 top-0 w-px transform bg-gradient-to-b from-blue-400/60 via-sky-400/60 to-cyan-400/60 md:left-8"></div>

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => cardRef(el, exp.id)}
              className={`relative mb-12 transition-all duration-1000 md:mb-16`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot - Always on left */}
              <div className="absolute left-1/2 z-10 h-4 w-4 -translate-x-2 transform rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25 md:left-8">
                <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-75"></div>
              </div>

              {/* Card - Always on right */}
              <div className="md:ml-16">
                <div
                  className={`group relative cursor-pointer transition-all duration-500`}
                  onClick={() => setActiveCard(activeCard === exp.id ? null : exp.id)}
                  onMouseEnter={() => setActiveCard(exp.id)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Glassmorphism card */}
                  <div className="relative overflow-hidden rounded-2xl border border-blue-200/30 bg-white/70 p-6 shadow-xl shadow-blue-500/10 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/80 dark:shadow-cyan-900/10 md:p-8">
                    {/* Gradient overlay */}
                    <div className="from-blue-500/8 to-cyan-500/8 absolute inset-0 bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-blue-900/10 dark:to-cyan-900/10"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h3 className="text-xl font-bold text-slate-800 transition-colors group-hover:text-blue-700 dark:text-cyan-200 group-hover:dark:text-cyan-400 md:text-2xl">
                              {exp.position}
                            </h3>
                            {exp.companyUrl && (
                              <ExternalLink className="h-4 w-4 text-slate-400 transition-colors group-hover:text-blue-500" />
                            )}
                          </div>
                          <p className="mb-2 text-lg font-medium text-blue-600 dark:text-cyan-300">{exp.company}</p>
                        </div>

                        <div className={`rounded-full border px-3 py-1 text-xs font-medium ${getTypeColor(exp.type)}`}>
                          {exp.type.replace('-', ' ').toUpperCase()}
                        </div>
                      </div>

                      {/* Meta info */}
                      <div className="mb-4 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">{exp.description}</p>

                      {/* Achievements */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          activeCard === exp.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="mb-4">
                          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-300">
                            <Award className="h-4 w-4" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <ChevronRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-cyan-500" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 backdrop-blur-sm transition-colors hover:bg-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-cyan-200 dark:hover:bg-slate-900"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Expand indicator */}
                      <div className="mt-4 flex items-center justify-center border-t border-blue-200/50 pt-4">
                        <ChevronRight
                          className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
                            activeCard === exp.id ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Animated border */}
                    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-blue-500/15 via-sky-500/15 to-cyan-500/15 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100 dark:from-blue-900/10 dark:via-sky-900/10 dark:to-cyan-900/10"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { icon: Briefcase, label: 'Years Experience', value: '4+', color: 'blue' },
            { icon: Award, label: 'Projects Delivered', value: '25+', color: 'sky' },
            { icon: TrendingUp, label: 'Performance Increase', value: '40%', color: 'cyan' },
          ].map((stat, i) => (
            <div
              key={i}
              className="group rounded-xl border border-blue-200/30 bg-white/70 p-6 text-center shadow-lg shadow-blue-500/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 dark:border-slate-700/50 dark:bg-slate-900/70 dark:text-cyan-200 hover:dark:bg-slate-900/80"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-${stat.color}-100 text-${stat.color}-600 mb-4 transition-transform group-hover:scale-110 dark:bg-${stat.color}-900/40 dark:text-${stat.color}-300`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <div className={`text-2xl font-bold text-${stat.color}-600 mb-1 dark:text-${stat.color}-300`}>
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
