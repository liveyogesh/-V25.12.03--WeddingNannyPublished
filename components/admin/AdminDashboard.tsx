
import React, { useMemo, useState } from 'react';
import { useTheme, AuditIssueType, Severity, AuditIssue } from '../../context/ThemeContext.tsx';
import { useConfig } from '../../context/ConfigContext.tsx';
import { useNavigate } from 'react-router-dom';
import { SECTION_REGISTRY } from '../../constants/SectionRegistry.tsx';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { stagedCityData, globalConfig, updateGlobalConfig } = useConfig();
  const { runAudit, clearAudit, auditIssues, healthScore, isAuditActive, isAuditing, auditProgress } = useTheme();

  const [auditScopeType, setAuditScopeType] = useState<'current' | 'global' | 'custom' | 'component'>('global');
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [customSelectors, setCustomSelectors] = useState<string>('');

  const [filterType, setFilterType] = useState<AuditIssueType | 'All'>('All');
  const [filterSeverity, setFilterSeverity] = useState<Severity | 'All'>('All');
  const [filterPage, setFilterPage] = useState<string | 'All'>('All');
  const [filterOffScreen, setFilterOffScreen] = useState<'All' | 'Yes' | 'No'>('All');

  // Dynamically derive sections from the registry to ensure consistency with AdminContentEditor
  const MASTER_SECTIONS = useMemo(() => Object.keys(SECTION_REGISTRY), []);

  const handleAuditRun = () => {
    const componentSelectors = auditScopeType === 'component' 
      ? customSelectors.split(',').map(s => s.trim()).filter(s => s.length > 0)
      : undefined;

    runAudit({
      type: auditScopeType,
      pageIds: (auditScopeType === 'custom' || auditScopeType === 'component') ? selectedPages : undefined,
      sectionIds: auditScopeType === 'custom' ? selectedSections : undefined,
      componentSelectors: componentSelectors
    }, stagedCityData, globalConfig.customAuditStyles);
  };

  const handleIssueClick = (issue: AuditIssue) => {
    if (issue.isOffScreen) {
      const targetPath = issue.pageId === 'home' ? '/' : `/${issue.pageId}`;
      if (window.confirm(`Issue is located on page "${issue.pageId}". Navigate there to inspect?`)) {
        navigate(targetPath);
      }
      return;
    }

    if (issue.auditId) {
      const element = document.querySelector(`[data-wn-audit-id="${issue.auditId}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (element as HTMLElement).focus();
        element.animate([
          { outlineColor: 'transparent', outlineWidth: '10px' },
          { outlineColor: '#f43f5e', outlineWidth: '5px' },
          { outlineColor: 'transparent', outlineWidth: '10px' }
        ], { duration: 1000, iterations: 2 });
      }
    }
  };

  const filteredIssues = useMemo(() => {
    return auditIssues.filter(issue => {
      const typeMatch = filterType === 'All' || issue.type === filterType;
      const severityMatch = filterSeverity === 'All' || issue.severity === filterSeverity;
      const pageMatch = filterPage === 'All' || issue.pageId === filterPage;
      const offScreenMatch = filterOffScreen === 'All' || (filterOffScreen === 'Yes' ? issue.isOffScreen : !issue.isOffScreen);
      return typeMatch && severityMatch && pageMatch && offScreenMatch;
    });
  }, [auditIssues, filterType, filterSeverity, filterPage, filterOffScreen]);

  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="flex justify-between items-end">
        <h2 className="text-4xl font-black text-navy-gemini font-sans">Accessibility Health Hub</h2>
        {healthScore && (
          <div className="flex gap-4 items-center bg-white px-6 py-4 rounded-3xl border border-gray-100 shadow-sm">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase text-gray-400">Current Health Index</p>
              <p className="text-2xl font-black text-navy-gemini">{healthScore.overall}%</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-rose-500 flex items-center justify-center font-black text-rose-500">
              {auditIssues.length}
            </div>
            <p className="text-[10px] font-black uppercase text-rose-500 max-w-[80px] leading-tight">Issues Found</p>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 flex flex-col space-y-8 h-fit max-h-[85vh] overflow-y-auto custom-scrollbar">
          <div>
            <h3 className="text-xl font-black text-navy-gemini mb-6">1. Audit Configuration</h3>
            <div className="space-y-3">
              {['current', 'global', 'custom', 'component'].map(s => (
                <button key={s} onClick={() => setAuditScopeType(s as any)} className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between font-black text-[10px] uppercase tracking-widest ${auditScopeType === s ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                  {s} scope
                  {auditScopeType === s && <i className="fas fa-check-circle"></i>}
                </button>
              ))}
            </div>

            {auditScopeType === 'component' && (
              <div className="mt-4 animate-slideInDown">
                <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">Custom CSS Selectors</label>
                <textarea 
                  value={customSelectors}
                  onChange={e => setCustomSelectors(e.target.value)}
                  placeholder=".card, #header nav, footer a"
                  className="w-full p-4 bg-gray-50 border rounded-2xl text-xs font-mono h-24 focus:border-rose-500 outline-none"
                ></textarea>
              </div>
            )}

            {(auditScopeType === 'custom' || auditScopeType === 'component') && (
              <div className="mt-6 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 animate-slideInDown space-y-6">
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 mb-3">Target Pages</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(stagedCityData).map(id => (
                      <button key={id} onClick={() => setSelectedPages(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])} className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter transition-all ${selectedPages.includes(id) ? 'bg-rose-500 text-white shadow-md' : 'bg-white text-gray-400 border border-gray-200 hover:border-rose-300'}`}>{id}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 mb-3">Target Sections</p>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto custom-scrollbar">
                    {MASTER_SECTIONS.map(sid => (
                      <button key={sid} onClick={() => setSelectedSections(prev => prev.includes(sid) ? prev.filter(x => x !== sid) : [...prev, sid])} className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter transition-all ${selectedSections.includes(sid) ? 'bg-rose-500 text-white shadow-md' : 'bg-white text-gray-400 border border-gray-200 hover:border-rose-300'}`}>{sid}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <h4 className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-widest">Custom Highlight Style</h4>
              <textarea 
                value={globalConfig.customAuditStyles}
                onChange={e => updateGlobalConfig({ ...globalConfig, customAuditStyles: e.target.value })}
                className="w-full p-4 bg-gray-50 border rounded-2xl text-xs font-mono h-24 focus:border-rose-500 outline-none"
              ></textarea>
            </div>
          </div>

          <div className="pt-10">
            {isAuditing ? (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase text-rose-500 tracking-[0.2em]">Executing Scan...</span>
                  <span className="text-xl font-black">{Math.round(auditProgress)}%</span>
                </div>
                <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden p-1 shadow-inner">
                  <div className="bg-rose-500 h-full rounded-full transition-all duration-300" style={{ width: `${auditProgress}%` }}></div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button onClick={handleAuditRun} className="w-full bg-rose-500 text-white font-black py-5 rounded-[2rem] hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20 text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                  <i className="fas fa-bolt"></i> Run Platform Audit
                </button>
                {isAuditActive && <button onClick={clearAudit} className="w-full bg-gray-50 text-gray-400 font-black py-4 rounded-[2rem] hover:bg-gray-100 transition-all text-[10px] uppercase tracking-widest">Dismiss Violations</button>}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 flex flex-col h-[800px]">
          <div className="flex justify-between items-start mb-10 border-b pb-6">
            <h3 className="text-xl font-black text-navy-gemini">Audit Log <span className="text-[10px] bg-rose-100 text-rose-500 px-3 py-1 rounded-full">{filteredIssues.length} matches</span></h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <select value={filterType} onChange={e => setFilterType(e.target.value as any)} className="w-full p-3 bg-gray-50 border rounded-xl text-[10px] font-black uppercase">
              <option value="All">All Types</option>
              <option value="Contrast">Contrast</option>
              <option value="ARIA">ARIA</option>
              <option value="Navigation">Navigation</option>
            </select>
            <select value={filterSeverity} onChange={e => setFilterSeverity(e.target.value as any)} className="w-full p-3 bg-gray-50 border rounded-xl text-[10px] font-black uppercase">
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="Warning">Warning</option>
              <option value="Info">Info</option>
            </select>
            <select value={filterPage} onChange={e => setFilterPage(e.target.value)} className="w-full p-3 bg-gray-50 border rounded-xl text-[10px] font-black uppercase">
              <option value="All">All Pages</option>
              {Object.keys(stagedCityData).map(id => (
                <option key={id} value={id}>{stagedCityData[id].name}</option>
              ))}
            </select>
            <select value={filterOffScreen} onChange={e => setFilterOffScreen(e.target.value as any)} className="w-full p-3 bg-gray-50 border rounded-xl text-[10px] font-black uppercase">
              <option value="All">Off-Screen: Any</option>
              <option value="Yes">Off-Screen Only</option>
              <option value="No">Visible Only</option>
            </select>
          </div>

          <div className="flex-grow overflow-y-auto space-y-4 pr-3 custom-scrollbar">
            {filteredIssues.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-200 py-20">
                <i className="fas fa-shield-heart text-7xl mb-6"></i>
                <p className="font-black text-xs uppercase tracking-widest">System integrity verified.</p>
              </div>
            ) : (
              filteredIssues.map((issue) => (
                <div 
                  key={issue.id} 
                  onClick={() => handleIssueClick(issue)}
                  className={`p-6 rounded-[2rem] border transition-all cursor-pointer hover:shadow-lg ${issue.severity === 'Critical' ? 'bg-rose-50/20 border-rose-100' : 'bg-gray-50 border-gray-100'}`}
                >
                  <h4 className="font-black text-navy-gemini text-sm leading-tight">{issue.message}</h4>
                  <p className="text-[9px] text-gray-400 mt-2 uppercase font-black">{issue.type} • {issue.elementName} in {issue.pageId}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
