
import React from 'react';
import Hero from '../components/Hero.tsx';
import Trust from '../components/Trust.tsx';
import WeddingReality from '../components/WeddingReality.tsx';
import Services from '../components/Services.tsx';
import HowItWorks from '../components/HowItWorks.tsx';
import EstimateCalculator from '../components/EstimateCalculator.tsx';
import Packages from '../components/Packages.tsx';
import PackageComparison from '../components/PackageComparison.tsx';
import Testimonials from '../components/Testimonials.tsx';
import FAQ from '../components/FAQ.tsx';
import Contact from '../components/Contact.tsx';
import Partners from '../components/Partners.tsx';
import About from '../components/About.tsx';
import LocalInsights from '../components/LocalInsights.tsx';
import LocationsMapPointer from '../components/LocationsMapPointer.tsx';
import { CityData } from '../types.ts';

export type SectionRegistryMap = Record<string, (data: CityData) => React.ReactNode>;

export const SECTION_REGISTRY: SectionRegistryMap = {
  hero: (data) => (
    <Hero 
      title={data.hero.title} 
      subtitle={data.hero.subtitle} 
      imageAlt={data.hero.imageAlt}
      pillText={data.hero.pillText}
    />
  ),
  trust: (data) => (
    <Trust 
      title={data.trust.title} 
      description={data.trust.description} 
    />
  ),
  'wedding-reality': (data) => (
    <WeddingReality 
      title={data.weddingReality?.title}
      subtitle={data.weddingReality?.subtitle}
    />
  ),
  services: (data) => (
    <Services 
      title={data.services?.title}
      subtitle={data.services?.subtitle}
      items={data.services?.items}
    />
  ),
  'how-it-works': (data) => (
    <HowItWorks 
      title={data.howItWorks?.title}
      subtitle={data.howItWorks?.subtitle}
      steps={data.howItWorks?.steps}
    />
  ),
  'estimate-calculator': (data) => (
    <EstimateCalculator defaultCity={data.name === 'India' ? undefined : data.name} />
  ),
  packages: (data) => (
    <Packages 
      title={data.packages?.title}
      subtitle={data.packages?.subtitle}
      items={data.packages?.items}
    />
  ),
  'package-comparison': (data) => (
    <PackageComparison 
      title={data.packageComparison?.title}
      subtitle={data.packageComparison?.subtitle}
      features={data.packageComparison?.features}
    />
  ),
  testimonials: (data) => (
    <Testimonials testimonials={data.testimonials} />
  ),
  faq: (data) => (
    <FAQ items={data.faqs} />
  ),
  contact: (data) => (
    <Contact 
      defaultCity={data.name} 
      title={data.contactContent?.title}
      subtitle={data.contactContent?.subtitle}
    />
  ),
  about: (data) => (
    <About 
      title={data.about?.title}
      paragraphs={data.about?.paragraphs}
      imageAlt={data.about?.imageAlt}
      statsCount={data.about?.statsCount}
      statsLabel={data.about?.statsLabel}
    />
  ),
  partners: (data) => (data.partners ? (
    <Partners 
      title={data.partnersContent?.title}
      subtitle={data.partnersContent?.subtitle}
    />
  ) : null),
  'local-insights': (data) => (
    data.localInsights ? (
      <LocalInsights 
        title={data.localInsights.title} 
        content={data.localInsights.content} 
      />
    ) : null
  ),
  'locations-map-pointer': () => <LocationsMapPointer />,
};
