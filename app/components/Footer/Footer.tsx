const Footer = () => {
  return (
    /* 
      Footer container:
      - mt-auto: Pushes footer to bottom when content is shorter than viewport
      - bg-light/dark-paper: Theme-based background color
      - border-t: Top border for visual separation
    */
    <footer className="mt-auto border-t border-light-border bg-gradient-to-br dark:border-dark-border dark:from-slate-800/50 dark:via-blue-900/50 dark:to-slate-900/50">
      {/* 
        Container for content:
        - container: Sets max-width and centers content
        - mx-auto: Centers container horizontally
        - px-4: Adds horizontal padding
      */}
      <div className="container mx-auto px-4">
        {/* 
          Content wrapper:
          - flex flex-col: Stack items vertically on mobile
          - md:flex-row: Place items side by side on medium screens
          - justify-between: Space items apart
          - items-center: Center items vertically
          - py-4: Vertical padding
        */}
        <div className="flex flex-col items-center justify-between py-4 md:flex-row">
          {/* 
            Copyright text:
            - text-sm: Smaller font size
            - text-light/dark-text-secondary: Theme-based text color
          */}
          <div className="gradient-text">
            Copyright © {new Date().getFullYear()} Jianbo (Paul). All rights reserved.
          </div>

          {/* 
            Links container:
            - flex gap-4: Horizontal layout with spacing
            - mt-2: Top margin on mobile
            - md:mt-0: Remove top margin on medium screens
          */}
          <div className="mt-2 hidden gap-4 md:mt-0 md:flex">
            <a
              href="https://www.linkedin.com/in/jianbo-cai-4540242a0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-primary hover:text-sky-600 dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
              aria-label="LinkedIn Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
