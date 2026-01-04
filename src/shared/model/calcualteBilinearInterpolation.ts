import Decimal from "decimal.js";

export type Table2D = {
  x: number[]; // ось X (например, температуры)
  y: number[]; // ось Y (например, диаметры)
  values: number[][]; // values[yIndex][xIndex]
};

export type BilinearInterpolationResult = {
  input: {
    x: Decimal;
    y: Decimal;
  };

  axes: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };

  tablePoints: {
    z11: Decimal; // (x1, y1)
    z12: Decimal; // (x2, y1)
    z21: Decimal; // (x1, y2)
    z22: Decimal; // (x2, y2)
  };

  intermediate: {
    atY1: Decimal; // интерполяция по X при y1
    atY2: Decimal; // интерполяция по X при y2
  };

  result: {
    exact: Decimal;
  };
};

const findBounds = (axis: number[], value: number): [number, number] => {
  if (value <= axis[0]) return [axis[0], axis[0]];
  if (value >= axis[axis.length - 1])
    return [axis[axis.length - 1], axis[axis.length - 1]];

  for (let i = 0; i < axis.length - 1; i++) {
    if (value >= axis[i] && value <= axis[i + 1]) {
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
    x1 === x2 ? z11 : z11.plus(xDecimal.minus(x1).mul(z12.minus(z11)).div(xD));

  // интерполяция по X при y2
  const atY2 =
    x1 === x2 ? z21 : z21.plus(xDecimal.minus(x1).mul(z22.minus(z21)).div(xD));

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
