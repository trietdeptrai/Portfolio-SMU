/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div 
        className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground"
        style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease-out" }}
      >
        <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  );
}
