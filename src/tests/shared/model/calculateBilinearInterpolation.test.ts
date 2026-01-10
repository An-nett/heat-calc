import { describe, it, expect } from "vitest";
import {
  interpolate2DDecimal,
  type Table2D,
} from "../../../shared/model/calcualteBilinearInterpolation";
import { Decimal } from "../../../lib/decimal";

describe("interpolate2DDecimal", () => {
  const sampleTable: Table2D = {
    x: [0, 1, 2],
    y: [0, 1, 2],
    values: [
      [0, 1, 2], // y=0
      [3, 4, 5], // y=1
      [6, 7, 8], // y=2
    ],
  };

  it("should interpolate correctly for values within bounds", () => {
    const result = interpolate2DDecimal(sampleTable, 0.5, 0.5);

    expect(result.input.x.toNumber()).toBe(0.5);
    expect(result.input.y.toNumber()).toBe(0.5);
    expect(result.axes).toEqual({ x1: 0, x2: 1, y1: 0, y2: 1 });
    expect(result.tablePoints.z11.toNumber()).toBe(0);
    expect(result.tablePoints.z12.toNumber()).toBe(3);
    expect(result.tablePoints.z21.toNumber()).toBe(1);
    expect(result.tablePoints.z22.toNumber()).toBe(4);
    expect(result.intermediate.atY1.toNumber()).toBe(0.5);
    expect(result.intermediate.atY2.toNumber()).toBe(3.5);
    expect(result.result.exact.toNumber()).toBe(2);
  });

  it("should return exact value when x and y are on grid points", () => {
    const result = interpolate2DDecimal(sampleTable, 1, 1);

    expect(result.result.exact.toNumber()).toBe(4);
    expect(result.axes).toEqual({ x1: 1, x2: 1, y1: 1, y2: 1 });
  });

  it("should handle boundary values correctly", () => {
    const result = interpolate2DDecimal(sampleTable, 0, 0);

    expect(result.result.exact.toNumber()).toBe(0);
    expect(result.axes).toEqual({ x1: 0, x2: 0, y1: 0, y2: 0 });
  });

  it("should clamp values below minimum", () => {
    const result = interpolate2DDecimal(sampleTable, -1, -1);

    expect(result.result.exact.toNumber()).toBe(0);
    expect(result.axes).toEqual({ x1: 0, x2: 0, y1: 0, y2: 0 });
  });

  it("should clamp values above maximum", () => {
    const result = interpolate2DDecimal(sampleTable, 3, 3);

    expect(result.result.exact.toNumber()).toBe(8);
    expect(result.axes).toEqual({ x1: 2, x2: 2, y1: 2, y2: 2 });
  });

  it("should interpolate correctly with different table", () => {
    const table: Table2D = {
      x: [10, 20],
      y: [100, 200],
      values: [
        [1, 2],
        [3, 4],
      ],
    };

    const result = interpolate2DDecimal(table, 15, 150);

    // Expected: bilinear interpolation
    // At x=15, y=100: (2-1)/(20-10)*(15-10)+1 = 1.5
    // At x=15, y=200: (4-3)/(20-10)*(15-10)+3 = 3.5
    // Final: (3.5-1.5)/(200-100)*(150-100)+1.5 = 2.5
    expect(result.result.exact.toNumber()).toBe(2.5);
  });

  it("should handle single point table", () => {
    const table: Table2D = {
      x: [5],
      y: [10],
      values: [[42]],
    };

    const result = interpolate2DDecimal(table, 5, 10);

    expect(result.result.exact.toNumber()).toBe(42);
  });

  it("should handle linear interpolation in one dimension when other is exact", () => {
    const result = interpolate2DDecimal(sampleTable, 0.5, 1);

    expect(result.axes).toEqual({ x1: 0, x2: 1, y1: 1, y2: 1 });
    expect(result.result.exact.toNumber()).toBe(3.5); // Linear interpolation between 3 and 4
  });

  it("should work with decimal inputs", () => {
    const result = interpolate2DDecimal(
      sampleTable,
      new Decimal(0.5),
      new Decimal(0.5)
    );

    expect(result.result.exact.toNumber()).toBe(2);
  });
});
