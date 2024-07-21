import React, { useState, useEffect } from 'react';
import useCalculate from '../api/hooks/useCalculate';
import useLogs from '../api/hooks/useLogs';
import { ExpressionType } from '../enums/ExpressionTypeEnum';
import HistoryComponent from './HistoryComponent';

const CalculatorComponent: React.FC = () => {
  const { calculate, result, error, loading } = useCalculate();
  const { logs, fetchLogs } = useLogs();
  const [expressionType, setExpressionType] = useState<ExpressionType | null>(null);
  const [firstOperand, setFirstOperand] = useState<string>('');
  const [secondOperand, setSecondOperand] = useState<string>('');
  const [returnInteger, setReturnInteger] = useState<boolean>(false);
  const [clientError, setClientError] = useState<string | null>(null);
  const [currentOperand, setCurrentOperand] = useState<'first' | 'second'>('first');

  const handleDigitClick = (digit: string) => {
    if (currentOperand === 'first') {
      setFirstOperand(firstOperand === '0' ? digit : firstOperand + digit);
    } else {
      setSecondOperand(secondOperand === '0' ? digit : secondOperand + digit);
    }
  };

  const handleOperatorClick = (operator: ExpressionType) => {
    if (firstOperand === '') {
      setClientError('Please enter the first operand.');
      return;
    }
    setClientError(null);
    setExpressionType(operator);
    setCurrentOperand('second');
  };

  const handleCalculate = async () => {
    if (expressionType === ExpressionType.Division && parseFloat(secondOperand) === 0) {
      setClientError('Cannot divide by zero.');
      return;
    }

    setClientError(null);
    await calculate(expressionType!, parseFloat(firstOperand), parseFloat(secondOperand), returnInteger);
    await fetchLogs();
    setCurrentOperand('first'); // Reset current operand to first
  };

  const handleClear = () => {
    setFirstOperand('');
    setSecondOperand('');
    setExpressionType(null);
    setClientError(null);
    setCurrentOperand('first');
  };

  const handleToggleReturnInteger = () => {
    setReturnInteger(!returnInteger);
  };

  useEffect(() => {
    if (result) {
      setFirstOperand(result.result.toString());
      setSecondOperand('');
      setExpressionType(null);
    }
  }, [result]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 space-x-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <div className="mb-4">
          <div className="bg-gray-200 rounded p-4 text-right text-2xl font-mono h-12">
            {firstOperand} {expressionType !== null && (expressionType === ExpressionType.Addition ? '+' : expressionType === ExpressionType.Subtraction ? '-' : expressionType === ExpressionType.Multiplication ? '*' : '/')} {secondOperand}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <button className="bg-gray-300 text-black rounded py-2" onClick={handleClear}>AC</button>
          <button className="bg-gray-300 text-black rounded py-2 col-span-2" onClick={handleToggleReturnInteger}>
            {returnInteger ? 'Integer' : 'Decimal'}
          </button>
          <button className="bg-gray-300 text-black rounded py-2" onClick={() => handleOperatorClick(ExpressionType.Addition)}>+</button>
          <button className="bg-gray-300 text-black rounded py-2" onClick={() => handleOperatorClick(ExpressionType.Subtraction)}>-</button>
          <button className="bg-gray-300 text-black rounded py-2" onClick={() => handleOperatorClick(ExpressionType.Multiplication)}>*</button>
          <button className="bg-gray-300 text-black rounded py-2" onClick={() => handleOperatorClick(ExpressionType.Division)}>/</button>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button key={num} className="bg-gray-300 text-black rounded py-2" onClick={() => handleDigitClick(num.toString())}>{num}</button>
          ))}
          <button className="bg-gray-300 text-black rounded py-2" onClick={() => handleDigitClick('.')}>.</button>
          <button className="bg-blue-500 text-white rounded py-2 col-span-2" onClick={handleCalculate}>=</button>
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {clientError && <p className="text-center text-red-500">{clientError}</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <HistoryComponent logs={logs} />
      </div>
    </div>
  );
};

export default CalculatorComponent;
