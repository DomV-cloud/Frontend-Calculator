import React from 'react';
import useLogs from './api/hooks/useLogs';

const LogsComponent: React.FC = () => {
  const { logs, error, loading } = useLogs();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calculation Logs</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Expression</th>
              <th className="px-4 py-2">First Operand</th>
              <th className="px-4 py-2">Second Operand</th>
              <th className="px-4 py-2">Result</th>
              <th className="px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="border px-4 py-2">{log.id}</td>
                <td className="border px-4 py-2">{log.expression}</td>
                <td className="border px-4 py-2">{log.firstOperand}</td>
                <td className="border px-4 py-2">{log.secondOperand}</td>
                <td className="border px-4 py-2">{log.result}</td>
                <td className="border px-4 py-2">{log.timeStamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LogsComponent;
