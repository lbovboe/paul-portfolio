'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import EnterGate from './EnterGate';
import SkillSection from './SkillSection';
import ProjectSection from './ProjectSection';
import ContactSection from './ContactSection';
import ExperienceSection from './ExperienceSection';
import OthersSection from './OthersSection';
const HomeClient = () => {
  // Gate content is used once and unmounted - the home page starts at Experience once the user enters
  const [hasEntered, setHasEntered] = useState(false);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const experienceRef = useRef(null);
  const othersRef = useRef(null);

  const isSkillsInView = useInView(skillsRef, { once: true });
  const isProjectsInView = useInView(projectsRef, { once: true });
  const isContactInView = useInView(contactRef, { once: true });
  const isExperienceInView = useInView(experienceRef, { once: true });
  const isOthersInView = useInView(othersRef, { once: true });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState('', document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="">
      {!hasEntered && <EnterGate onEnter={() => setHasEntered(true)} />}
      <div id="experience" ref={experienceRef}>
        {isExperienceInView && <ExperienceSection />}
      </div>
      <div id="projects" ref={projectsRef}>
        {isProjectsInView && <ProjectSection />}
      </div>
      <div id="skills" ref={skillsRef}>
        {/* skills section for desktop version */}
        {isSkillsInView && <SkillSection />}
      </div>
      <div id="contact" ref={contactRef}>
        {isContactInView && <ContactSection />}
      </div>
      <div id="others" ref={othersRef}>
        {isOthersInView && <OthersSection />}
      </div>
    </div>
  );
};

export default HomeClient;
