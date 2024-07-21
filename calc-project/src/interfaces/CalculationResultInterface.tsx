import { ExpressionType } from '../enums/ExpressionTypeEnum';

export interface CalculationResult {
    expression: ExpressionType;
    firstOperand: number;
    secondOperand: number;
    result: number;
  }
  