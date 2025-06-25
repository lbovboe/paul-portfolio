'use client';

import { useState, useEffect } from 'react';

// Custom hook to create typewriter effect
// Parameters:
// - texts: array of strings to type out sequentially
// - typingSpeed: milliseconds between each character typed
// - delayBetweenTexts: milliseconds to wait before starting next text
const useTypewriter = (texts: string[], typingSpeed = 100, delayBetweenTexts = 1000) => {
  // Track which text from the array we're currently typing
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  // Track how much of the current text has been typed
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    // Get the full text we're currently typing (use modulo to loop through texts array)
    const currentFullText = texts[currentTextIndex % texts.length];

    // If we haven't finished typing the current text
    if (currentText.length < currentFullText.length) {
      // Set a timeout to add the next character
      const timeoutId = setTimeout(() => {
        setCurrentText(currentFullText.slice(0, currentText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeoutId);
    }

    // If we've finished typing the current text, wait and then move to next text
    const timeoutId = setTimeout(() => {
      setCurrentTextIndex((prev) => prev + 1);
      setCurrentText(''); // Reset current text to start typing next string
    }, delayBetweenTexts);

    return () => clearTimeout(timeoutId);
  }, [currentText, currentTextIndex, texts, typingSpeed, delayBetweenTexts]);

  return { currentText };
};

const IntroText = () => {
  // Array of roles to display in the typewriter effect - mobile-optimized shorter versions
  const roles = ['Full Stack Developer', 'React & Next.js Expert', 'TypeScript Enthusiast'];
  // Use typewriter hook with custom timing (slightly faster for mobile)
  const { currentText } = useTypewriter(roles, 50, 1500);

  // Handler for smooth scroll to #contact
  const handleConnectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector('#skills');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* CSS Keyframes for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }

        .animate-delay-200 {
          animation-delay: 0.2s;
        }

        .animate-delay-400 {
          animation-delay: 0.4s;
        }

        .animate-delay-600 {
          animation-delay: 0.6s;
        }

        .animate-delay-800 {
          animation-delay: 0.8s;
        }

        .animate-delay-1000 {
          animation-delay: 1s;
        }

        .gradient-bg {
          background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4);
          background-size: 400% 400%;
          animation: gradientShift 3s ease infinite;
        }

        .text-gradient {
          background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease infinite;
        }
      `}</style>

      <div className="flex h-full flex-col items-center justify-center space-y-4  sm:space-y-6 lg:space-y-8">
        {/* Glass morphism card container - responsive and mobile-optimized */}
        <div className="animate-fadeInUp w-full max-w-xs rounded-2xl border border-white/20 bg-white/10 p-4 text-center opacity-0 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-black/20 sm:max-w-2xl sm:rounded-3xl sm:p-6 lg:max-w-4xl lg:p-8 xl:p-12">
          {/* Modern greeting - responsive text sizing */}
          <div className="animate-fadeIn animate-delay-200 mb-2 opacity-0 sm:mb-4">
            <span className="text-sm font-medium tracking-wide text-gray-600 dark:text-gray-300 sm:text-lg lg:text-xl">
              Hello, I&apos;m
            </span>
          </div>

          {/* Dramatic name typography - highly responsive */}
          <h1 className="animate-slideInUp animate-delay-400 mb-4 text-3xl font-black tracking-tight opacity-0 sm:mb-6 sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
            <span className="text-gradient">Paul</span>
          </h1>

          {/* Role with typewriter effect - responsive spacing and sizing */}
          <div className="animate-fadeIn animate-delay-600 mb-4 opacity-0 sm:mb-6 lg:mb-8">
            <div className="mb-2 flex items-center justify-center space-x-2 text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-100 sm:space-x-3 sm:text-xl lg:text-2xl xl:text-3xl">
              <span className="text-lg text-blue-500 sm:text-2xl">▹</span>
              <span className="min-h-[1.2em] text-center">{currentText}</span>
              <span className="animate-pulse text-lg text-purple-500 sm:text-2xl">|</span>
            </div>
            <div className="mx-auto h-0.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 sm:h-1 sm:w-16 lg:w-20"></div>
          </div>

          {/* Streamlined description - responsive and readable on mobile */}
          <p className="animate-fadeIn animate-delay-800 mx-auto mb-4 max-w-sm text-sm leading-relaxed text-gray-600 opacity-0 dark:text-gray-300 sm:mb-6 sm:max-w-xl sm:text-lg lg:mb-8 lg:max-w-2xl lg:text-xl">
            Crafting seamless digital experiences with cutting-edge technologies and innovative solutions.
          </p>

          {/* Enhanced CTA button - mobile-optimized touch target */}
          <div className="animate-slideInUp animate-delay-1000 opacity-0">
            <a href="#contact" onClick={handleConnectClick} className="inline-block">
              <div className="group relative">
                <div className="gradient-bg absolute -inset-1 rounded-xl opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200 sm:rounded-2xl"></div>
                <button className="relative flex min-h-[44px] touch-manipulation items-center divide-x divide-gray-600 rounded-lg bg-blue-400 px-4 py-3 leading-none dark:bg-white sm:rounded-xl sm:px-6 sm:py-4 lg:px-8">
                  <span className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-sm font-semibold text-white dark:text-black sm:text-base lg:text-lg">
                      Let&apos;s Connect
                    </span>
                  </span>
                  <span className="pl-3 text-sm text-white transition duration-200 group-hover:text-white dark:text-blue-600 dark:group-hover:text-black sm:pl-4 sm:text-base">
                    →
                  </span>
                </button>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroText;
