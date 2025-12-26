
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CITY_DATA as INITIAL_CITY_DATA } from '../constants.ts';
import { CityData, GlobalConfig, BackupEntry, ChangeLog, BookingRecord } from '../types.ts';
import { storageService, AppState } from '../services/StorageService.ts';

const INITIAL_BOOKINGS: BookingRecord[] = [
  { id: '1', clientName: 'Amit & Ritu', city: 'Delhi-NCR', date: '2025-05-15', revenue: 15000, status: 'confirmed' },
  { id: '2', clientName: 'Suresh Kumar', city: 'Hyderabad', date: '2025-06-10', revenue: 8000, status: 'confirmed' },
  { id: '3', clientName: 'Priya Verma', city: 'Ballia', date: '2025-05-20', revenue: 12000, status: 'confirmed' },
];

const INITIAL_GLOBAL: GlobalConfig = {
  siteName: "The Wedding Nanny",
  metaTitle: "The Wedding Nanny | Premium Childcare for Events",
  robotsTxt: "User-agent: *\nDisallow: /admin",
  sitemapXml: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <url><loc>https://weddingnanny.in/</loc></url>\n</urlset>",
  headScripts: "<!-- Google Analytics Placeholder -->",
  footerScripts: "",
  metaDescription: "Premium on-demand childcare and activity corners for Indian weddings. Professional vetting and care.",
  keywords: "wedding childcare, indian wedding nannies, event babysitting",
  googleTagId: "G-XXXXXXXXXX",
  ogImageUrl: "https://weddingnanny.in/og-image.jpg",
  customJs: "",
  customAuditStyles: "",
  bookings: INITIAL_BOOKINGS
};

interface ConfigContextType {
  allCityData: Record<string, CityData>;
  stagedCityData: Record<string, CityData>;
  globalConfig: GlobalConfig;
  backups: BackupEntry[];
  logs: ChangeLog[];
  isLoading: boolean;
  saveStaging: (cityId: string, newData: CityData) => void;
  publishCity: (cityId: string) => void;
  discardStaging: (cityId: string) => void;
  updateGlobalConfig: (newGlobal: GlobalConfig, logDetails?: Partial<ChangeLog>) => void;
  createBackup: (bk: Omit<BackupEntry, 'id' | 'timestamp' | 'data'>) => void;
  restoreBackup: (backupId: string) => void;
  deleteBackup: (backupId: string) => void;
  resetToDefault: () => void;
  restoreState: (snapshot: string) => void;
  addCityPage: (id: string, name: string) => void;
  copyCityPage: (sourceId: string, newId: string, newName: string) => void;
  importConfig: (json: string) => void;
  exportConfig: () => string;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children?: React.ReactNode }) => {
  const [allCityData, setAllCityData] = useState<Record<string, CityData>>(INITIAL_CITY_DATA);
  const [stagedCityData, setStagedCityData] = useState<Record<string, CityData>>(INITIAL_CITY_DATA);
  const [globalConfig, setGlobalConfig] = useState<GlobalConfig>(INITIAL_GLOBAL);
  const [backups, setBackups] = useState<BackupEntry[]>([]);
  const [logs, setLogs] = useState<ChangeLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedState = storageService.load();
    if (loadedState) {
      if (loadedState.cities) setAllCityData(loadedState.cities);
      if (loadedState.staged) setStagedCityData(loadedState.staged);
      else if (loadedState.cities) setStagedCityData(loadedState.cities);
      
      if (loadedState.global) setGlobalConfig({ ...INITIAL_GLOBAL, ...loadedState.global });
      if (loadedState.backups) setBackups(loadedState.backups);
      if (loadedState.logs) setLogs(loadedState.logs);
    }
    
    // Simulate a brief loading period for premium UX feel
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const persistState = (
    cities: Record<string, CityData>, 
    staged: Record<string, CityData>, 
    global: GlobalConfig, 
    bks: BackupEntry[], 
    lgs: ChangeLog[]
  ) => {
    storageService.save({
      cities,
      staged,
      global,
      backups: bks,
      logs: lgs
    });
  };

  const addLog = (logDetails: Partial<ChangeLog>) => {
    const currentState = JSON.stringify({ cities: allCityData, staged: stagedCityData, global: globalConfig });
    const newLog: ChangeLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      description: logDetails.description || "Action performed",
      author: "Administrator",
      page: logDetails.page,
      section: logDetails.section,
      component: logDetails.component,
      stateSnapshot: currentState,
      ...logDetails
    };
    const updatedLogs = [newLog, ...logs].slice(0, 100);
    setLogs(updatedLogs);
    return updatedLogs;
  };

  const saveStaging = (cityId: string, newData: CityData) => {
    setStagedCityData(prev => {
      const updated = { ...prev, [cityId]: newData };
      persistState(allCityData, updated, globalConfig, backups, logs);
      return updated;
    });
  };

  const publishCity = (cityId: string) => {
    const draft = stagedCityData[cityId];
    if (!draft) return;
    
    setAllCityData(prev => {
      const updated = { ...prev, [cityId]: draft };
      const updatedLogs = addLog({ 
        description: `Published changes for page: ${draft.name}`, 
        page: cityId 
      });
      persistState(updated, stagedCityData, globalConfig, backups, updatedLogs);
      return updated;
    });
  };

  const discardStaging = (cityId: string) => {
    const prod = allCityData[cityId];
    if (!prod) return;

    setStagedCityData(prev => {
      const updated = { ...prev, [cityId]: prod };
      const updatedLogs = addLog({ 
        description: `Discarded draft changes for: ${prod.name}`, 
        page: cityId 
      });
      persistState(allCityData, updated, globalConfig, backups, updatedLogs);
      return updated;
    });
  };

  const updateGlobalConfig = (newGlobal: GlobalConfig, logDetails?: Partial<ChangeLog>) => {
    setGlobalConfig(newGlobal);
    const updatedLogs = addLog({ description: "Updated Global Settings", ...logDetails });
    persistState(allCityData, stagedCityData, newGlobal, backups, updatedLogs);
  };

  const addCityPage = (id: string, name: string) => {
    const newCity: CityData = {
      ...INITIAL_CITY_DATA.home,
      id,
      name,
      layout: ['hero', 'trust', 'contact']
    };
    
    setAllCityData(prev => {
      const updatedProd = { ...prev, [id]: newCity };
      setStagedCityData(prevStaged => {
        const updatedStaged = { ...prevStaged, [id]: newCity };
        const updatedLogs = addLog({ description: `Added new page: ${name}`, page: id });
        persistState(updatedProd, updatedStaged, globalConfig, backups, updatedLogs);
        return updatedStaged;
      });
      return updatedProd;
    });
  };

  const copyCityPage = (sourceId: string, newId: string, newName: string) => {
    const source = stagedCityData[sourceId] || allCityData[sourceId];
    if (!source) return alert("Source page not found");
    
    const newCity = { ...source, id: newId, name: newName };
    
    setAllCityData(prev => {
      const updatedProd = { ...prev, [newId]: newCity };
      setStagedCityData(prevStaged => {
        const updatedStaged = { ...prevStaged, [newId]: newCity };
        const updatedLogs = addLog({ description: `Cloned ${source.name} to ${newName}`, page: newId });
        persistState(updatedProd, updatedStaged, globalConfig, backups, updatedLogs);
        return updatedStaged;
      });
      return updatedProd;
    });
  };

  const createBackup = (bkInput: Omit<BackupEntry, 'id' | 'timestamp' | 'data'>) => {
    const newBackup: BackupEntry = {
      ...bkInput,
      id: `bk-${Date.now()}`,
      timestamp: Date.now(),
      data: { cities: allCityData, global: globalConfig }
    };
    const updatedBackups = [newBackup, ...backups];
    setBackups(updatedBackups);
    const updatedLogs = addLog({ description: `Created Backup: ${bkInput.label}` });
    persistState(allCityData, stagedCityData, globalConfig, updatedBackups, updatedLogs);
  };

  const restoreBackup = (id: string) => {
    const bk = backups.find(b => b.id === id);
    if (!bk) return;
    if (!window.confirm(`Restore backup "${bk.label}"?`)) return;
    setAllCityData(bk.data.cities);
    setStagedCityData(bk.data.cities);
    setGlobalConfig(bk.data.global);
    const updatedLogs = addLog({ description: `Restored Backup: ${bk.label}` });
    persistState(bk.data.cities, bk.data.cities, bk.data.global, backups, updatedLogs);
  };

  const restoreState = (snapshot: string) => {
    try {
      const parsed = JSON.parse(snapshot);
      setAllCityData(parsed.cities);
      setStagedCityData(parsed.staged || parsed.cities);
      setGlobalConfig(parsed.global);
      const updatedLogs = addLog({ description: "Restored system state from audit log" });
      persistState(parsed.cities, parsed.staged || parsed.cities, parsed.global, backups, updatedLogs);
    } catch (e) {
      console.error("Restore failed", e);
    }
  };

  const deleteBackup = (id: string) => {
    const updatedBackups = backups.filter(b => b.id !== id);
    setBackups(updatedBackups);
    persistState(allCityData, stagedCityData, globalConfig, updatedBackups, logs);
  };

  const resetToDefault = () => {
    if (window.confirm("Reset EVERYTHING?")) {
      setAllCityData(INITIAL_CITY_DATA);
      setStagedCityData(INITIAL_CITY_DATA);
      setGlobalConfig(INITIAL_GLOBAL);
      const updatedLogs = addLog({ description: "System Reset" });
      persistState(INITIAL_CITY_DATA, INITIAL_CITY_DATA, INITIAL_GLOBAL, backups, updatedLogs);
    }
  };

  const exportConfig = () => JSON.stringify({ cities: allCityData, staged: stagedCityData, global: globalConfig, backups, logs });

  const importConfig = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      setAllCityData(parsed.cities);
      setStagedCityData(parsed.staged || parsed.cities);
      setGlobalConfig(parsed.global);
      setBackups(parsed.backups || []);
      setLogs(parsed.logs || []);
      persistState(parsed.cities, parsed.staged || parsed.cities, parsed.global, parsed.backups || [], parsed.logs || []);
      alert("Imported!");
    } catch (e) {
      alert("Invalid JSON");
    }
  };

  return (
    <ConfigContext.Provider value={{ 
      allCityData, stagedCityData, globalConfig, backups, logs, isLoading,
      saveStaging, publishCity, discardStaging, updateGlobalConfig, createBackup, restoreBackup, deleteBackup, 
      resetToDefault, restoreState, addCityPage, copyCityPage, importConfig, exportConfig
    }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error("useConfig must be used within ConfigProvider");
  return context;
};
