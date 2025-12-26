
import React from 'react';
import { CityData } from '../types.ts';
import { SECTION_REGISTRY } from '../constants/SectionRegistry.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';

interface SectionRendererProps {
  sectionId: string;
  data: CityData;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ sectionId, data }) => {
  const renderSection = SECTION_REGISTRY[sectionId];
  
  if (!renderSection) {
    console.warn(`SectionRenderer: Unknown section ID "${sectionId}"`);
    return null;
  }

  return (
    <ErrorBoundary>
      {renderSection(data)}
    </ErrorBoundary>
  );
};

export default SectionRenderer;
