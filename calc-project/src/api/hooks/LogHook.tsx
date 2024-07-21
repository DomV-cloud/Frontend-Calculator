import { Log } from '../../interfaces/LogInterface';

export interface LogsHook {
    logs: Log[];
    error: string | null;
    loading: boolean;
    fetchLogs: () => Promise<void>;
  }