import { Suspense } from 'react';
import DocsCta from '@/components/DocsCta';
import Download from '@/components/Download';
import Faq from '@/components/Faq';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Navbar from '@/components/Navbar';
import Stats from '@/components/Stats';
import Themes from '@/components/Themes';
import WhyXoboard from '@/components/WhyXoboard';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Features />
        <HowItWorks />
        <Suspense fallback={null}>
          <Download />
        </Suspense>
        <Themes />
        <WhyXoboard />
        <Suspense fallback={null}>
          <Stats />
        </Suspense>
        <Faq />
        <DocsCta />
      </main>
      <Footer />
    </>
  );
}
