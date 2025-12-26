
import { CityData, GlobalConfig, BackupEntry, ChangeLog } from '../types.ts';

const STORAGE_KEY = 'wedding_nanny_master_config_v4';

export interface AppState {
  cities: Record<string, CityData>;
  staged: Record<string, CityData>;
  global: GlobalConfig;
  backups: BackupEntry[];
  logs: ChangeLog[];
  adminPasswordHash?: string;
}

class StorageService {
  save(state: AppState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("StorageService: Failed to save state", error);
    }
  }

  load(): AppState | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;
      return JSON.parse(saved) as AppState;
    } catch (error) {
      console.error("StorageService: Failed to load state", error);
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export const storageService = new StorageService();
