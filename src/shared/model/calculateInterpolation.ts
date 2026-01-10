import { Decimal } from "../../lib/decimal";

export interface InterpolationArgs {
  x: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const calculateInterpolation = (args: InterpolationArgs) => {
  const { x, x1, y1, x2, y2 } = args;

  if (x2 === x1) return null;

  const decimalX = new Decimal(x);
  const decimalX1 = new Decimal(x1);
  const decimalY1 = new Decimal(y1);
  const decimalX2 = new Decimal(x2);
  const decimalY2 = new Decimal(y2);

  const numerator = decimalY2.minus(decimalY1).times(decimalX.minus(decimalX1));
  const denominator = decimalX2.minus(decimalX1);

  return decimalY1.plus(numerator.dividedBy(denominator));
};
