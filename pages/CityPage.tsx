
import React from 'react';
import { CityData } from '../types.ts';
import SectionRenderer from '../components/SectionRenderer.tsx';
import SEORuntime from '../components/SEORuntime.tsx';
import ErrorBoundary from '../components/ErrorBoundary.tsx';

interface CityPageProps {
  data: CityData;
}

const CityPage: React.FC<CityPageProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="animate-fadeIn">
      <SEORuntime data={data} />
      <ErrorBoundary fallback={
        <div className="min-h-screen flex items-center justify-center p-8 bg-rose-50 dark:bg-slate-900">
          <div className="max-w-md text-center bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-2xl border border-rose-100">
            <h2 className="text-3xl font-extrabold text-navy-gemini dark:text-white mb-4">Content Temporarily Unavailable</h2>
            <p className="text-gray-500 mb-6">We encountered an issue loading the content for {data.name}. Our technical team has been notified.</p>
            <button onClick={() => window.location.reload()} className="bg-rose-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-rose-600 transition-all">
              Try Again
            </button>
          </div>
        </div>
      }>
        {data.layout.map((sectionId, idx) => (
          <React.Fragment key={`${sectionId}-${idx}`}>
            <SectionRenderer sectionId={sectionId} data={data} />
          </React.Fragment>
        ))}
      </ErrorBoundary>
    </div>
  );
};

export default CityPage;
