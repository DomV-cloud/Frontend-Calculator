import React from 'react';
import { Log } from './interfaces/LogInterface';

interface HistoryComponentProps {
  logs: Log[];
}

const HistoryComponent: React.FC<HistoryComponentProps> = ({ logs }) => {
  const sortedLogs = [...logs].sort((a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());

  return (
    <div className="container mx-auto p-4 max-h-80 overflow-y-auto bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Historie:</h2>
      <ul className="list-disc pl-5">
        {sortedLogs.map((log) => (
          <li key={log.id} className="mb-2">
            {log.firstOperand} {log.expression} {log.secondOperand} = {log.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryComponent;
