import type { Metadata } from 'next';
import { ThemeProvider } from '@/app/context/ThemeContext';
import BackgroundRenderer from './components/tools/Animation/BackgroundRenderer';
import './globals.css';
import './reset.css';
import Footer from '@/app/components/Footer/Footer';
import ConditionalHeader from '@/app/components/Headers/ConditionalHeader';
// Define metadata for the application
export const metadata: Metadata = {
  title: 'Jianbo (Paul) | Portfolio',
  description: 'Portfolio of Jianbo (Paul)',
};

// Root layout component that wraps all pages
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <BackgroundRenderer />
          <ConditionalHeader />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
