'use client';
import IntroText from '../tools/Animation/IntroText';
import IntroTextMobile from './Mobile/IntroTextMobile';

const AnimatedIntroBanner = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Content container - centered for optimal composition */}
      <div className="relative z-20 flex h-full items-center justify-center px-6 md:px-12 lg:px-16">
        {/* Desktop content */}
        <div className="w-full max-w-5xl">
          <IntroText />
        </div>
      </div>
    </div>
  );
};

export default AnimatedIntroBanner;
