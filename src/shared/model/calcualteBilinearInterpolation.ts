import { type DecimalType, Decimal } from "../../lib/decimal";

export type Table2D = {
  x: number[]; // ось X (например, температуры)
  y: number[]; // ось Y (например, диаметры)
  values: number[][]; // values[yIndex][xIndex]
};

export type BilinearInterpolationResult = {
  input: {
    x: DecimalType;
    y: DecimalType;
  };

  axes: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };

  tablePoints: {
    z11: DecimalType; // (x1, y1)
    z12: DecimalType; // (x2, y1)
    z21: DecimalType; // (x1, y2)
    z22: DecimalType; // (x2, y2)
  };

  intermediate: {
    atY1: DecimalType; // интерполяция по X при y1
    atY2: DecimalType; // интерполяция по X при y2
  };

  result: {
    exact: DecimalType;
  };
};

const findBounds = (axis: number[], value: number): [number, number] => {
  if (value <= axis[0]) return [axis[0], axis[0]];
  if (value >= axis[axis.length - 1])
    return [axis[axis.length - 1], axis[axis.length - 1]];

  for (let i = 0; i < axis.length - 1; i++) {
    if (value === axis[i]) {
      return [axis[i], axis[i]];
    }
    if (value > axis[i] && value < axis[i + 1]) {
      return [axis[i], axis[i + 1]];
    }
  }

  return [axis[0], axis[0]]; // формально недостижимо
};

export const interpolate2DDecimal = (
  table: Table2D,
  xValue: Decimal.Value,
  yValue: Decimal.Value
): BilinearInterpolationResult => {
  const { x, y, values } = table;

  const xDecimal = new Decimal(xValue);
  const yDecimal = new Decimal(yValue);

  const xValueNum = xDecimal.toNumber();
  const yValueNum = yDecimal.toNumber();

  const [x1, x2] = findBounds(x, xValueNum);
  const [y1, y2] = findBounds(y, yValueNum);

  const xi1 = x.indexOf(x1);
  const xi2 = x.indexOf(x2);
  const yi1 = y.indexOf(y1);
  const yi2 = y.indexOf(y2);

  const z11 = new Decimal(values[yi1][xi1]);
  const z12 = new Decimal(values[yi2][xi1]);
  const z21 = new Decimal(values[yi1][xi2]);
  const z22 = new Decimal(values[yi2][xi2]);

  const xD = new Decimal(x2).minus(x1);
  const yD = new Decimal(y2).minus(y1);

  // интерполяция по X при y1
  const atY1 =
    x1 === x2 ? z11 : z11.plus(xDecimal.minus(x1).mul(z21.minus(z11)).div(xD));

  // интерполяция по X при y2
  const atY2 =
    x1 === x2 ? z12 : z12.plus(xDecimal.minus(x1).mul(z22.minus(z12)).div(xD));

  // финальная интерполяция по Y
  const exact =
    y1 === y2
      ? atY1
      : atY1.plus(yDecimal.minus(y1).mul(atY2.minus(atY1)).div(yD));

  return {
    input: { x: xDecimal, y: yDecimal },

    axes: { x1, x2, y1, y2 },

    tablePoints: { z11, z12, z21, z22 },

    intermediate: { atY1, atY2 },

    result: { exact },
  };
};
