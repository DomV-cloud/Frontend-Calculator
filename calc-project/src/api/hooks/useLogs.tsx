import { useState, useEffect } from 'react';
import { Log } from '../../interfaces/LogInterface';
import { LogsHook } from './LogHook';
import { API_BASE_URL } from '../../configuration/AppConf';

const useLogs = (): LogsHook => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/logs`);

      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }

      const data: Log[] = await response.json();
      setLogs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return { logs, error, loading, fetchLogs };
};

export default useLogs;
