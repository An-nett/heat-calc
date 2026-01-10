import { describe, it, expect } from "vitest";
import {
  calculateInterpolation,
  type InterpolationArgs,
} from "../../../shared/model/calculateInterpolation";

describe("calculateInterpolation", () => {
  it("should interpolate correctly for basic case", () => {
    const args: InterpolationArgs = {
      x: 5,
      x1: 0,
      y1: 0,
      x2: 10,
      y2: 20,
    };

    const result = calculateInterpolation(args);

    expect(result?.toNumber()).toBe(10); // At x=5, halfway between 0 and 10, y should be halfway between 0 and 20
  });

  it("should return y1 when x equals x1", () => {
    const args: InterpolationArgs = {
      x: 0,
      x1: 0,
      y1: 5,
      x2: 10,
      y2: 15,
    };

    const result = calculateInterpolation(args);

    expect(result?.toNumber()).toBe(5);
  });

  it("should return y2 when x equals x2", () => {
    const args: InterpolationArgs = {
      x: 10,
      x1: 0,
      y1: 5,
      x2: 10,
      y2: 15,
    };

    const result = calculateInterpolation(args);

    expect(result?.toNumber()).toBe(15);
  });

  it("should return null when x2 equals x1 (division by zero)", () => {
    const args: InterpolationArgs = {
      x: 5,
      x1: 10,
      y1: 0,
      x2: 10,
      y2: 20,
    };

    const result = calculateInterpolation(args);

    expect(result).toBeNull();
  });

  it("should handle negative values correctly", () => {
    const args: InterpolationArgs = {
      x: -5,
      x1: -10,
      y1: 0,
      x2: 0,
      y2: 10,
    };

    const result = calculateInterpolation(args);

    expect(result?.toNumber()).toBe(5); // Halfway point
  });

  it("should handle decreasing x values", () => {
    const args: InterpolationArgs = {
      x: 5,
      x1: 10,
      y1: 20,
      x2: 0,
      y2: 0,
    };

    const result = calculateInterpolation(args);

    expect(result?.toNumber()).toBe(10); // At x=5, which is halfway from 10 to 0, y should be halfway from 20 to 0
  });

  it("should handle fractional results", () => {
    const args: InterpolationArgs = {
      x: 1,
      x1: 0,
      y1: 0,
      x2: 3,
      y2: 6,
    };

    const result = calculateInterpolation(args);

    expect(result?.toNumber()).toBe(2); // 1/3 of the way from 0 to 6
  });

  it("should work with decimal inputs that result in exact values", () => {
    const args: InterpolationArgs = {
      x: 2.5,
      x1: 0,
      y1: 0,
      x2: 5,
      y2: 10,
    };

    const result = calculateInterpolation(args);

    expect(result?.toNumber()).toBe(5);
  });
});
