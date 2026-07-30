'use client';
import { useState, useEffect } from 'react';
import Chip from '../tools/Animation/Chip';
import ThemeToggle from '../tools/ThemeToggle';
import Image from 'next/image';

const navItems = [
  { text: 'Home', href: '#home' },
  { text: 'Skills', href: '#skills' },
  { text: 'Projects', href: '#projects' },
  { text: 'Experience', href: '#experience' },
  { text: 'Contact', href: '#contact' },
];

/**
 * Navbar Component - Main navigation bar with automatic section detection
 *
 * This component implements two main features:
 * 1. Manual navigation: Users can click nav items to scroll to sections
 * 2. Automatic detection: Nav items highlight based on current scroll position
 *
 * The automatic detection uses the Intersection Observer API to monitor
 * when sections enter/exit the viewport and updates the active nav item accordingly.
 *
 */
const Navbar = (): JSX.Element => {
  // State to track which navigation item is currently selected/active
  const [selected, setSelected] = useState(navItems[0].text);

  // State to track if user has scrolled (for styling the navbar background)
  const [scrolled, setScrolled] = useState(false);

  /**
   * Effect 1: Handle navbar background styling based on scroll position
   * This creates a backdrop blur effect when user scrolls down
   */
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled past the top of the page
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);

      // The #home anchor is a zero-height sentinel (the hero now lives in the enter gate),
      // so it never crosses the observer's mid-viewport band below - highlight "Home" by scroll position instead
      if (window.scrollY < 100) {
        setSelected('Home');
      }
    };

    // Add scroll event listener to window
    window.addEventListener('scroll', handleScroll);

    // Cleanup: Remove event listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Effect 2: Implement automatic section detection using Intersection Observer
   * This is the core functionality that makes the navbar automatically update
   * when users scroll to different sections
   */
  useEffect(() => {
    /**
     * Intersection Observer configuration
     * - root: null means observe relative to the viewport
     * - rootMargin: '-50% 0px -50% 0px' creates a "detection zone" in the middle 50% of viewport
     *   This means sections are considered "active" when they're in the center of the screen
     * - threshold: 0 means trigger as soon as any part of the element enters the detection zone
     */
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Only trigger when section is in middle 50% of viewport
      threshold: 0, // Trigger immediately when section enters the detection zone
    };

    /**
     * Callback function that runs whenever a section enters or exits the detection zone
     */
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // Only process sections that are entering the detection zone (becoming visible)
        if (entry.isIntersecting) {
          // Get the ID of the section that's now visible
          const sectionId = entry.target.id;

          // Find the corresponding navigation item for this section
          const navItem = navItems.find((item) => item.href === `#${sectionId}`);

          // Update the selected state to highlight the correct nav item
          if (navItem) {
            setSelected(navItem.text);
          }
        }
      });
    };

    // Create the Intersection Observer with our configuration and callback
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    /**
     * Set up observation for all sections
     * We loop through each navigation item and find the corresponding DOM element
     */
    navItems.forEach((item) => {
      // Convert href (#home) to element ID (home) by removing the '#'
      const sectionId = item.href.substring(1);

      // Find the actual DOM element with this ID
      const element = document.getElementById(sectionId);

      // Start observing this element if it exists
      if (element) {
        observer.observe(element);
      }
    });

    /**
     * Cleanup function: Disconnect observer when component unmounts
     * This prevents memory leaks and removes all element observations
     */
    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  /**
   * Handle manual navigation when user clicks on nav items
   * This provides smooth scrolling to the target section and immediately updates the selected state
   *
   * @param {React.MouseEvent<HTMLAnchorElement>} e - Click event
   * @param {Object} item - Navigation item that was clicked
   * @param {string} item.text - Display text of the nav item
   * @param {string} item.href - Target section href (e.g., '#home')
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { text: string; href: string }) => {
    // Prevent default anchor link behavior (which would cause a jump)
    e.preventDefault();

    // Find the target section element
    const element = document.querySelector(item.href);

    if (element) {
      // Smooth scroll to the target section
      element.scrollIntoView({ behavior: 'smooth' });

      // Immediately update the selected state (don't wait for Intersection Observer)
      // This provides instant visual feedback when user clicks
      setSelected(item.text);
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-2 py-5 transition-all duration-300 md:px-6 ${
        // Conditional styling: Add background blur and shadow when scrolled
        scrolled ? 'bg-white/50 shadow-md backdrop-blur-sm dark:bg-slate-900/50' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo section - only visible on medium screens and up */}
        <div className="hidden h-[40px] w-[40px] overflow-hidden rounded-full bg-white md:block">
          <Image src="/apple-icon.png" alt="Logo" width={40} height={40} />
        </div>

        {/* Navigation chips container */}
        <div className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => (
            <a href={item.href} key={item.text} onClick={(e) => handleNavClick(e, item)}>
              {/* 
                Chip component receives:
                - text: Display text for the nav item
                - selected: Boolean indicating if this item is currently active
                - onClick: Handler for when the chip is clicked
              */}
              <Chip text={item.text} selected={selected === item.text} onClick={() => setSelected(item.text)} />
            </a>
          ))}
        </div>

        {/* Theme toggle button */}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
