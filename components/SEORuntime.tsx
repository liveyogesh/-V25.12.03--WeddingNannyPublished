import React, { useEffect } from 'react';
import { useConfig } from '../context/ConfigContext.tsx';
import { CityData } from '../types.ts';

interface SEORuntimeProps {
  data?: CityData;
}

const SEORuntime: React.FC<SEORuntimeProps> = ({ data }) => {
  const { globalConfig } = useConfig();

  useEffect(() => {
    const title = data?.seo?.title || (data?.name && data.name !== 'India' ? `${data.name} | ${globalConfig.siteName}` : globalConfig.metaTitle);
    const description = data?.seo?.description || globalConfig.metaDescription;
    const keywords = data?.seo?.keywords || globalConfig.keywords;
    const ogImage = data?.seo?.ogImage || globalConfig.ogImageUrl;
    const canonical = window.location.href;

    // Update Page Title
    document.title = title || 'The Wedding Nanny';

    // Helper to update meta tags
    const updateMetaTag = (attrName: string, attrValue: string, content: string | undefined) => {
      if (content === undefined) return;
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    
    // Open Graph
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:url', canonical);
    updateMetaTag('property', 'og:type', 'website');

    // Twitter
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);

  }, [data, globalConfig]);

  return null;
};

export default SEORuntime;