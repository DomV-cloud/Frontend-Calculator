import { useState } from 'react';
import { ExpressionType } from '../../enums/ExpressionTypeEnum';
import { CalculationResult } from '../../interfaces/CalculationResultInterface';
import { CalculateHook } from './CalculateHook';
import { API_BASE_URL } from '../../configuration/AppConf';

const useCalculate = (): CalculateHook => {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const calculate = async (expressionType: ExpressionType, firstOperand: number, secondOperand: number, returnInteger: boolean) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expressionType, firstOperand, secondOperand, returnInteger }),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate');
      }

      const data: CalculationResult = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { calculate, result, error, loading };
};

export default useCalculate;