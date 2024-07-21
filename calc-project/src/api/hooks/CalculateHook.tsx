import { ExpressionType } from "../../enums/ExpressionTypeEnum";
import { CalculationResult } from "../../interfaces/CalculationResultInterface";

export interface CalculateHook {
    calculate: (expressionType: ExpressionType, firstOperand: number, secondOperand: number, returnInteger: boolean) => Promise<void>;
    result: CalculationResult | null;
    error: string | null;
    loading: boolean;
  }