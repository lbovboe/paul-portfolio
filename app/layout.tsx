import type { Metadata } from 'next';
import { ThemeProvider } from '@/app/context/ThemeContext';
import './globals.css';
import './reset.css';
import Footer from '@/app/components/Footer/Footer';
import Navbar from '@/app/components/Headers/NavBar';
// Define metadata for the application
export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio of Paul',
};

// Root layout component that wraps all pages
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* 
        Body classes:
        - min-h-screen: Ensures minimum height of 100vh
        - flex flex-col: Sets up vertical flexbox layout
        - Light mode gradient:
          - bg-gradient-to-br: Base gradient direction
          - from-light-background-gradient-start
          - via-light-background-gradient-via
          - to-light-background-gradient-end
        - Dark mode gradient:
          - dark:from-dark-background-gradient-start
          - dark:via-dark-background-gradient-via
          - dark:to-dark-background-gradient-end
      */}
      <body className="gradient-bg flex min-h-screen flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
