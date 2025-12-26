
export interface Testimonial {
  text: string;
  author: string;
  location?: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingCityOption {
  value: string;
  label: string;
  travelCost: number;
  thumbnail: string;
}

export interface PageSEO {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export interface ServiceItem {
  emoji: string;
  title: string;
  text: string;
  border?: string;
}

export interface StepItem {
  emoji: string;
  title: string;
  text: string;
}

export interface PackageType {
  name: string; // Internal ID / Display Name
  description: string;
  price: string;
  subPrice: string;
  features: { text: string; included: boolean }[];
  recommended?: boolean;
  colorTheme?: 'white' | 'navy';
  badge?: string; // e.g. "MOST POPULAR"
}

export interface ComparisonFeature {
  label: string;
  elopement: string | boolean;
  basic: string | boolean;
  premium: string | boolean;
  multi: string | boolean;
}

export interface CityData {
  id: string;
  name: string;
  layout: string[];
  seo?: PageSEO;
  hero: {
    title: string;
    subtitle: string;
    imageAlt: string;
    pillText?: string;
  };
  trust: {
    title: string;
    description: string;
  };
  services?: {
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  howItWorks?: {
    title: string;
    subtitle: string;
    steps: StepItem[];
  };
  about?: {
    title: string;
    paragraphs: string[];
    imageAlt?: string;
    statsCount?: string;
    statsLabel?: string;
  };
  weddingReality?: {
    title: string;
    subtitle: string;
  };
  packages?: {
    title: string;
    subtitle: string;
    items: PackageType[];
  };
  packageComparison?: {
    title: string;
    subtitle: string;
    features: ComparisonFeature[];
  };
  partnersContent?: {
    title: string;
    subtitle: string;
  };
  contactContent?: {
    title: string;
    subtitle: string;
  };
  testimonials: Testimonial[];
  faqs: FAQItem[];
  partners?: boolean; // Toggles section visibility
  localInsights?: {
    title: string;
    content: string[];
  };
}

export interface BookingRecord {
  id: string;
  clientName: string;
  city: string;
  date: string;
  revenue: number;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface GlobalConfig {
  robotsTxt: string;
  sitemapXml: string;
  headScripts: string;
  footerScripts: string;
  siteName: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  googleTagId: string;
  ogImageUrl: string;
  customJs: string;
  customAuditStyles: string;
  bookings: BookingRecord[];
}

export interface ChangeLog {
  id: string;
  timestamp: number;
  description: string;
  author: string;
  page?: string;
  section?: string;
  component?: string;
  stateSnapshot?: string; // Stringified state for undo/restore
}

export interface BackupEntry {
  id: string;
  timestamp: number;
  label: string;
  description?: string;
  type: 'Full' | 'Incremental';
  remoteStorage?: string;
  data: {
    cities: Record<string, CityData>;
    global: GlobalConfig;
  };
}
