import React, { useState, useMemo } from 'react';
import { useConfig } from '../../context/ConfigContext.tsx';
import CityPage from '../../pages/CityPage.tsx';
import { SECTION_REGISTRY } from '../../constants/SectionRegistry.tsx';
import { HeroEditor, TrustEditor, JsonEditor, AboutEditor } from './editors/SectionEditors.tsx';

const AdminContentEditor: React.FC = () => {
  const { stagedCityData, allCityData, saveStaging, publishCity, addCityPage, copyCityPage } = useConfig();
  const [selectedCityId, setSelectedCityId] = useState<string>('home');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const [showNewPageModal, setShowNewPageModal] = useState(false);
  const [showCloneModal, setShowCloneModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  const [newPageId, setNewPageId] = useState('');
  const [newPageName, setNewPageName] = useState('');
  const [clonePageId, setClonePageId] = useState('');
  const [clonePageName, setClonePageName] = useState('');

  const MASTER_SECTIONS = useMemo(() => Object.keys(SECTION_REGISTRY), []);
  const currentWorkingData = stagedCityData[selectedCityId] || allCityData[selectedCityId];

  const hasUnpublishedSavedChanges = useMemo(() => {
    return JSON.stringify(stagedCityData[selectedCityId]) !== JSON.stringify(allCityData[selectedCityId]);
  }, [stagedCityData, allCityData, selectedCityId]);

  const updateSectionData = (sectionKey: string, newData: any) => {
    saveStaging(selectedCityId, { ...currentWorkingData, [sectionKey]: newData });
  };

  const renderSpecificEditor = (sid: string) => {
    switch (sid) {
      case 'hero':
        return <HeroEditor data={currentWorkingData.hero} onChange={(d) => updateSectionData('hero', d)} />;
      case 'trust':
        return <TrustEditor data={currentWorkingData.trust} onChange={(d) => updateSectionData('trust', d)} />;
      case 'about':
        return <AboutEditor data={currentWorkingData.about} onChange={(d) => updateSectionData('about', d)} />;
      case 'testimonials':
        return <JsonEditor label="Testimonials" data={currentWorkingData.testimonials} onChange={(d) => updateSectionData('testimonials', d)} />;
      case 'faq':
        return <JsonEditor label="FAQs" data={currentWorkingData.faqs} onChange={(d) => updateSectionData('faqs', d)} />;
      case 'services':
        return <JsonEditor label="Services" data={currentWorkingData.services} onChange={(d) => updateSectionData('services', d)} />;
      case 'packages':
        return <JsonEditor label="Packages" data={currentWorkingData.packages} onChange={(d) => updateSectionData('packages', d)} />;
      default:
        return <p className="text-xs text-gray-400 italic">No advanced editor for this section yet. Use the JSON mode if available or edit global constants.</p>;
    }
  };

  return (
    <div className="animate-fadeIn space-y-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-navy-gemini font-sans">Content Management</h2>
          <p className="text-gray-400 text-sm mt-1">Editing: <span className="font-bold text-rose-500">{currentWorkingData?.name}</span> ({selectedCityId})</p>
        </div>
        <div className="flex gap-3">
           <button onClick={() => setShowPreviewModal(true)} className="px-6 py-3 rounded-2xl font-bold text-[10px] uppercase text-navy-gemini bg-white border border-gray-200 hover:border-rose-300 hover:text-rose-500 transition-all shadow-sm">
            <i className="fas fa-eye mr-2"></i> Live Preview
          </button>
          <button onClick={() => publishCity(selectedCityId)} disabled={!hasUnpublishedSavedChanges} className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase text-white transition-all ${hasUnpublishedSavedChanges ? 'bg-rose-500 shadow-xl hover:bg-rose-600' : 'bg-gray-200 grayscale cursor-not-allowed'}`}>
            Publish Changes
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-4">
           <button onClick={() => setShowNewPageModal(true)} className="w-full py-4 rounded-2xl font-bold text-sm bg-navy-gemini text-white shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
            <i className="fas fa-plus-circle"></i> Create New Page
          </button>
          <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
            {Object.keys(stagedCityData).map(id => (
              <div key={id} className="relative group">
                <button onClick={() => setSelectedCityId(id)} className={`w-full text-left p-5 rounded-3xl transition-all flex items-center justify-between ${selectedCityId === id ? 'bg-rose-500 text-white shadow-lg' : 'bg-white border hover:border-rose-200'}`}>
                  <span className="font-bold truncate max-w-[140px]">{stagedCityData[id].name}</span>
                  {JSON.stringify(stagedCityData[id]) !== JSON.stringify(allCityData[id]) && <i className="fas fa-circle text-[8px] text-yellow-300" title="Unpublished Changes"></i>}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-3 bg-white rounded-[3rem] p-8 md:p-10 shadow-sm border border-gray-100 min-h-[600px]">
          <h3 className="text-2xl font-black text-navy-gemini mb-8 border-b pb-6">Section Editor</h3>
          <div className="space-y-4">
            {MASTER_SECTIONS.map(sid => {
              const active = currentWorkingData?.layout.includes(sid);
              const isExpanded = expandedSection === sid;
              return (
                <div key={sid} className={`rounded-3xl border transition-all overflow-hidden ${active ? 'bg-white border-rose-100 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button onClick={() => {
                        const newLayout = active ? currentWorkingData.layout.filter(l => l !== sid) : [...currentWorkingData.layout, sid];
                        saveStaging(selectedCityId, {...currentWorkingData, layout: newLayout});
                      }} className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-sm ${active ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                        <i className={`fas ${active ? 'fa-check' : 'fa-plus'}`}></i>
                      </button>
                      <span className={`font-black text-xs uppercase tracking-wider ${active ? 'text-navy-gemini' : 'text-gray-400'}`}>{sid}</span>
                    </div>
                    {active && <button onClick={() => setExpandedSection(isExpanded ? null : sid)} className="text-xs font-bold text-rose-500 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors">{isExpanded ? 'Close' : 'Edit'}</button>}
                  </div>
                  {active && isExpanded && <div className="p-6 bg-rose-50/30 border-t border-rose-100 animate-slideInDown">{renderSpecificEditor(sid)}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showPreviewModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col animate-fadeIn">
          <div className="h-14 bg-navy-gemini flex items-center justify-between px-6 border-b border-white/10 text-white font-bold">
            <span>Preview Mode: {currentWorkingData.name}</span>
            <button onClick={() => setShowPreviewModal(false)}><i className="fas fa-times text-xl"></i></button>
          </div>
          <div className="flex-grow overflow-y-auto bg-white"><CityPage data={currentWorkingData} /></div>
        </div>
      )}
    </div>
  );
};

export default AdminContentEditor;