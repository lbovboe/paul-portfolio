'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../tools/ThemeToggle';

/**
 * NAVIGATION CONFIGURATION
 * Defines the navigation structure for the mobile menu
 * Each item contains href (anchor link), label (display text), and icon (emoji)
 */
const navItems = [
  { href: '#experience', label: 'Experience', icon: '💼' },
  { href: '#projects', label: 'Projects', icon: '🚀' },
  { href: '#skills', label: 'Skills', icon: '💻' },
  { href: '#contact', label: 'Contact', icon: '📧' },
  { href: '#others', label: 'Others', icon: '🧩' },
];

/**
 * MobileNavBar Component - Advanced Mobile Navigation System
 *
 * FEATURE OVERVIEW:
 * ================
 * 1. 🎨 THEME-AWARE DESIGN - Automatically adapts colors based on light/dark theme
 * 2. 🍔 ANIMATED HAMBURGER MENU - Smooth 3-line to X transformation
 * 3. 👁️ AUTOMATIC SECTION DETECTION - Uses Intersection Observer API for real-time section tracking
 * 4. 🎯 SMOOTH SCROLLING NAVIGATION - Programmatic smooth scrolling to sections
 * 5. 🚪 OUTSIDE CLICK DETECTION - Closes menu when clicking outside the menu area
 * 6. 🔒 BODY SCROLL PREVENTION - Prevents background scrolling when menu is open
 * 7. 🌫️ BACKDROP BLUR OVERLAY - Semi-transparent backdrop with blur effect
 * 8. ✨ STAGGERED ANIMATIONS - Menu items animate in sequence for visual appeal
 * 9. 🎯 ACTIVE SECTION HIGHLIGHTING - Visual feedback for current page section
 * 10. 🌓 INTEGRATED THEME TOGGLE - Theme switcher built into mobile menu
 * 11. 🏠 LOGO NAVIGATION - Logo acts as home button
 * 12. 📱 RESPONSIVE DESIGN - Adapts to different mobile screen sizes
 * 13. 🎭 SCROLL-BASED HEADER STYLING - Header background changes on scroll
 * 14. 🧹 MEMORY MANAGEMENT - Proper cleanup of event listeners and observers
 */
const MobileNavBar = () => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  /**
   * MENU OPEN/CLOSE STATE
   * Controls the visibility of the mobile menu
   * - true: Menu is open and visible
   * - false: Menu is closed and hidden
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * ACTIVE SECTION STATE
   * Tracks which navigation section is currently active/selected
   * Updated automatically by Intersection Observer or manually by user clicks
   */
  const [selected, setSelected] = useState(navItems[0].label);

  /**
   * SCROLL DETECTION STATE
   * Tracks whether the user has scrolled away from the top of the page
   * Used to apply backdrop blur effect to the header
   */
  const [scrolled, setScrolled] = useState(false);

  /**
   * THEME CONTEXT
   * Provides access to the current theme (light/dark) for conditional styling
   */
  const { theme } = useTheme();

  // ============================================================================
  // FEATURE 1: SCROLL-BASED HEADER STYLING
  // ============================================================================

  /**
   * SCROLL DETECTION EFFECT
   *
   * PURPOSE: Creates a dynamic header that changes appearance when scrolling
   *
   * HOW IT WORKS:
   * 1. Adds scroll event listener to window
   * 2. Checks if user has scrolled past the top (window.scrollY > 0)
   * 3. Updates 'scrolled' state to trigger conditional styling
   * 4. Header gains backdrop blur and shadow when scrolled
   *
   * VISUAL EFFECT:
   * - At top: Transparent header that blends with background
   * - When scrolled: Blurred background with shadow for better readability
   */
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // CLEANUP: Remove listener when component unmounts to prevent memory leaks
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ============================================================================
  // FEATURE 2: AUTOMATIC SECTION DETECTION
  // ============================================================================

  /**
   * INTERSECTION OBSERVER EFFECT
   *
   * PURPOSE: Automatically detects which section is currently visible and updates navigation
   *
   * HOW IT WORKS:
   * 1. Creates an Intersection Observer to monitor section visibility
   * 2. Uses rootMargin: '-50% 0px -50% 0px' to create a "detection zone" in the middle 50% of viewport
   * 3. When a section enters this zone, it's considered "active"
   * 4. Updates the 'selected' state to highlight the corresponding navigation item
   *
   * CONFIGURATION BREAKDOWN:
   * - root: null = observe relative to viewport
   * - rootMargin: '-50% 0px -50% 0px' = only trigger when section is in center 50% of screen
   * - threshold: 0 = trigger immediately when section enters detection zone
   *
   * VISUAL RESULT:
   * - Navigation automatically highlights as user scrolls through sections
   * - Provides real-time feedback of user's current position on page
   */
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Detection zone in middle 50% of viewport
      threshold: 0,
    };

    /**
     * OBSERVER CALLBACK FUNCTION
     * Processes intersection events when sections enter/exit the detection zone
     */
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // Only process sections that are entering the detection zone
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const navItem = navItems.find((item) => item.href === `#${sectionId}`);
          if (navItem) {
            setSelected(navItem.label);
          }
        }
      });
    };

    // Create observer with configuration and callback
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Start observing all sections defined in navItems
    navItems.forEach((item) => {
      const sectionId = item.href.substring(1); // Remove '#' from href
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // CLEANUP: Disconnect observer when component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  // ============================================================================
  // FEATURE 3: SMOOTH SCROLLING NAVIGATION
  // ============================================================================

  /**
   * NAVIGATION CLICK HANDLER
   *
   * PURPOSE: Handles user clicks on navigation items with smooth scrolling
   *
   * HOW IT WORKS:
   * 1. Finds the target section element using querySelector
   * 2. Scrolls to the section with smooth animation
   * 3. Immediately updates the selected state for instant visual feedback
   * 4. Closes the mobile menu after navigation
   *
   * PARAMETERS:
   * @param {Object} item - Navigation item containing href and label
   * @param {string} item.href - Target section anchor (e.g., '#home')
   * @param {string} item.label - Display name for the section
   *
   * USER EXPERIENCE:
   * - Instant visual feedback when clicking navigation items
   * - Smooth scrolling animation to target section
   * - Menu automatically closes after selection
   */
  const handleLinkClick = (item: { href: string; label: string }) => {
    const element = document.querySelector(item.href);
    if (element) {
      // Smooth scroll to target section
      element.scrollIntoView({ behavior: 'smooth' });

      // Immediately update selected state for instant feedback
      setSelected(item.label);
    }

    // Close mobile menu after navigation
    setIsOpen(false);
  };

  // ============================================================================
  // FEATURE 4: OUTSIDE CLICK DETECTION
  // ============================================================================

  /**
   * OUTSIDE CLICK DETECTION EFFECT
   *
   * PURPOSE: Closes the mobile menu when user clicks outside the menu area
   *
   * HOW IT WORKS:
   * 1. Adds mousedown event listener to entire document
   * 2. Checks if the clicked element is outside the menu container
   * 3. Uses CSS class selector '.mobile-nav-container' to identify menu area
   * 4. Closes menu if click is detected outside
   *
   * UX BENEFIT:
   * - Intuitive behavior that users expect from mobile menus
   * - Provides easy way to close menu without clicking close button
   * - Prevents accidental menu interactions when user clicks elsewhere
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Check if menu is open and click is outside menu container
      if (isOpen && !target.closest('.mobile-nav-container')) {
        setIsOpen(false);
      }
    };

    // Add listener to document
    document.addEventListener('mousedown', handleClickOutside);

    // CLEANUP: Remove listener when component unmounts
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]); // Re-run effect when isOpen changes

  // ============================================================================
  // FEATURE 5: BODY SCROLL PREVENTION
  // ============================================================================

  /**
   * BODY SCROLL PREVENTION EFFECT
   *
   * PURPOSE: Prevents background page scrolling when mobile menu is open
   *
   * HOW IT WORKS:
   * 1. Monitors the 'isOpen' state
   * 2. When menu opens: Sets document.body.style.overflow = 'hidden'
   * 3. When menu closes: Resets document.body.style.overflow = 'unset'
   * 4. Cleanup function ensures overflow is always reset
   *
   * UX BENEFIT:
   * - Prevents confusing background scrolling when menu is open
   * - Focuses user attention on the menu
   * - Provides more native mobile app-like experience
   * - Prevents accidental page navigation while using menu
   */
  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore normal scrolling when menu is closed
      document.body.style.overflow = 'unset';
    }

    // CLEANUP: Always restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]); // Re-run effect when menu open state changes

  // ============================================================================
  // COMPONENT RENDER
  // ============================================================================

  return (
    <div className="mobile-nav-container relative z-50 md:hidden">
      {/* ========================================================================
          FEATURE 6: RESPONSIVE HEADER WITH LOGO AND HAMBURGER
          ======================================================================== */}

      {/* 
        DYNAMIC HEADER STYLING
        - Transparent when at top of page
        - Backdrop blur and shadow when scrolled
        - Theme-aware background colors
      */}
      <nav
        className={`fixed top-0 w-full px-4 py-5 transition-all duration-300 ${
          scrolled ? 'bg-white/50 shadow-md backdrop-blur-sm dark:bg-slate-900/50' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* 
            LOGO AS HOME BUTTON
            - Clickable logo that navigates to home section
            - Uses same navigation logic as menu items
          */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center"
            aria-label="Scroll to top"
          >
            <div className="h-[32px] w-[32px] overflow-hidden rounded-full bg-white">
              <Image src="/apple-icon.png" alt="Logo" width={32} height={32} />
            </div>
          </button>

          {/* ====================================================================
              FEATURE 7: ANIMATED HAMBURGER MENU BUTTON
              ==================================================================== */}

          {/* 
            HAMBURGER ANIMATION BREAKDOWN:
            - Three horizontal lines that transform into an X
            - Top line: Rotates 45° and moves down
            - Middle line: Fades out (opacity: 0)
            - Bottom line: Rotates -45° and moves up
            - Theme-aware colors (dark lines on light theme, light lines on dark theme)
          */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group relative z-50 flex h-8 w-8 flex-col items-center justify-center space-y-1"
            aria-label="Toggle navigation menu"
          >
            {/* TOP LINE - Rotates and moves down when menu opens */}
            <span
              className={`h-0.5 w-6 origin-center transform transition-all duration-300 ease-in-out ${
                isOpen ? 'translate-y-1.5 rotate-45' : ''
              } ${theme === 'light' ? 'bg-slate-800' : 'bg-white'}`}
            />
            {/* MIDDLE LINE - Fades out when menu opens */}
            <span
              className={`h-0.5 w-6 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'} ${
                theme === 'light' ? 'bg-slate-800' : 'bg-white'
              }`}
            />
            {/* BOTTOM LINE - Rotates and moves up when menu opens */}
            <span
              className={`h-0.5 w-6 origin-center transform transition-all duration-300 ease-in-out ${
                isOpen ? '-translate-y-1.5 -rotate-45' : ''
              } ${theme === 'light' ? 'bg-slate-800' : 'bg-white'}`}
            />
          </button>
        </div>
      </nav>

      {/* ========================================================================
          FEATURE 8: BACKDROP BLUR OVERLAY
          ======================================================================== */}

      {/* 
        OVERLAY FUNCTIONALITY:
        - Semi-transparent dark background with blur effect
        - Smoothly fades in/out with menu open/close
        - Clickable to close menu (outside click detection)
        - Covers entire screen when active
      */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* ========================================================================
          FEATURE 9: ANIMATED MOBILE MENU PANEL
          ======================================================================== */}

      {/* 
        MENU PANEL FEATURES:
        - Slides in from right side of screen
        - Theme-aware gradient background
        - Responsive width (80% of screen, max 85vw)
        - Full height coverage
        - Smooth transform animations
      */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] transform shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${
          theme === 'light'
            ? 'bg-gradient-to-br from-blue-50 via-white to-pink-50'
            : 'bg-gradient-to-br from-blue-950 via-slate-900 to-purple-950'
        }`}
      >
        {/* ====================================================================
            FEATURE 10: CLOSE BUTTON WITH HOVER EFFECTS
            ==================================================================== */}

        {/* 
          CLOSE BUTTON FEATURES:
          - Positioned in top-right corner
          - Hover scale animation (scale-110)
          - Theme-aware background and text colors
          - X icon using SVG for crisp rendering
        */}
        <button
          onClick={() => setIsOpen(false)}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 ${
            theme === 'light'
              ? 'bg-blue-100/80 text-slate-700 hover:bg-blue-200/80'
              : 'bg-blue-800/30 text-white hover:bg-blue-700/50'
          }`}
          aria-label="Close menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ====================================================================
            FEATURE 11: BRANDED MENU HEADER
            ==================================================================== */}

        {/* 
          HEADER FEATURES:
          - Logo display with ring border
          - Welcome message with theme-appropriate colors
          - Separator border with theme-aware color
        */}
        <div className={`border-b px-6 pb-4 pt-6 ${theme === 'light' ? 'border-blue-200/50' : 'border-blue-800/30'}`}>
          <div className="flex items-center space-x-3">
            <div className="h-[48px] w-[48px] overflow-hidden rounded-full bg-white shadow-md ring-2 ring-blue-400">
              <Image src="/apple-icon.png" alt="Logo" width={48} height={48} />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Portfolio</h3>
              <p className={`text-sm ${theme === 'light' ? 'text-blue-600' : 'text-blue-200'}`}>
                Welcome to my portfolio
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================================
            FEATURE 12: ANIMATED NAVIGATION ITEMS
            ==================================================================== */}

        {/* 
          NAVIGATION ITEMS FEATURES:
          - Staggered entrance animations (each item delayed by 50ms)
          - Active state highlighting with theme-aware colors
          - Hover effects with scale animation and color changes
          - Icons with hover scale effects
          - Right-pointing arrow indicators
          - Smooth transitions for all interactive states
        */}
        <div className="space-y-2 px-6 py-4">
          {navItems.map((item, index) => (
            <button
              key={item.href}
              onClick={() => handleLinkClick(item)}
              className={`group flex w-full transform items-center space-x-4 rounded-xl p-4 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                selected === item.label
                  ? theme === 'light'
                    ? 'bg-blue-100/80 text-blue-700 shadow-md' // Active state - light theme
                    : 'bg-blue-600/40 text-blue-200 shadow-md' // Active state - dark theme
                  : theme === 'light'
                    ? 'text-slate-700 hover:bg-blue-50/80 hover:text-blue-600' // Inactive state - light theme
                    : 'text-gray-200 hover:bg-blue-800/30 hover:text-blue-300' // Inactive state - dark theme
              }`}
              style={{
                /* STAGGERED ANIMATION SYSTEM */
                animationDelay: `${index * 50}ms`, // Each item appears 50ms after the previous
                animation: isOpen
                  ? 'slideInRight 0.3s ease-out forwards' // Slide in from right when menu opens
                  : 'none',
              }}
            >
              {/* ICON WITH HOVER SCALE EFFECT */}
              <span className="text-2xl transition-transform duration-200 group-hover:scale-110">{item.icon}</span>

              {/* NAVIGATION LABEL */}
              <span className="font-medium">{item.label}</span>

              {/* RIGHT ARROW INDICATOR */}
              <div className="ml-auto">
                <svg
                  className={`h-5 w-5 transition-colors ${
                    theme === 'light'
                      ? 'text-gray-400 group-hover:text-blue-500'
                      : 'text-gray-400 group-hover:text-blue-300'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* ====================================================================
            FEATURE 13: INTEGRATED THEME TOGGLE SECTION
            ==================================================================== */}

        {/* 
          THEME TOGGLE FEATURES:
          - Dedicated section with separator border
          - Gradient background matching theme colors
          - Theme toggle component integration
          - Visual theme icon and label
        */}
        <div className={`mt-4 border-t px-6 py-4 ${theme === 'light' ? 'border-blue-200/50' : 'border-blue-800/30'}`}>
          <div
            className={`flex items-center justify-between rounded-xl p-4 ${
              theme === 'light'
                ? 'bg-gradient-to-r from-purple-50/50 to-pink-50/50'
                : 'bg-gradient-to-r from-purple-900/30 to-pink-900/30'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎨</span>
              <span className={`font-medium ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`}>Theme</span>
            </div>
            {/* THEME TOGGLE COMPONENT INTEGRATION */}
            <ThemeToggle />
          </div>
        </div>

        {/* ====================================================================
            FEATURE 14: BRANDED FOOTER
            ==================================================================== */}

        {/* 
          FOOTER FEATURES:
          - Fixed to bottom of menu
          - Copyright notice with theme-appropriate colors
          - Subtle opacity for non-intrusive presence
        */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <p className={`text-xs ${theme === 'light' ? 'text-blue-500/70' : 'text-blue-300/70'}`}>
            © {new Date().getFullYear()} Jianbo (Paul) Portfolio
          </p>
        </div>
      </div>

      {/* ========================================================================
          FEATURE 15: CUSTOM CSS ANIMATIONS
          ======================================================================== */}

      {/* 
        SLIDEINNRIGHT ANIMATION:
        - Starts with opacity: 0 and translateX(20px)
        - Animates to opacity: 1 and translateX(0)
        - Creates smooth entrance effect for menu items
        - Combined with staggered delays for wave-like appearance
      */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MobileNavBar;
