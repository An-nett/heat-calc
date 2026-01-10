import { describe, it, expect } from "vitest";
import {
  calculateDelta,
  type DeltaCalcInput,
} from "@/features/isolation/model/calculateDelta";
import { Decimal } from "@/lib/decimal";

describe("calculateDelta", () => {
  it("should calculate delta correctly with valid inputs", () => {
    const input: DeltaCalcInput = {
      d: 100, // diameter
      B: new Decimal(2.5), // coefficient B
    };

    const result = calculateDelta(input);

    expect(result).not.toBeNull();
    // delta = d * (B - 1) / 2 = 100 * (2.5 - 1) / 2 = 100 * 1.5 / 2 = 75
    expect(result!.toNumber()).toBe(75);
  });

  it("should return null when d is null", () => {
    const input: DeltaCalcInput = {
      d: null,
      B: new Decimal(2.5),
    };

    const result = calculateDelta(input);

    expect(result).toBeNull();
  });

  it("should return null when B is null", () => {
    const input: DeltaCalcInput = {
      d: 100,
      B: null,
    };

    const result = calculateDelta(input);

    expect(result).toBeNull();
  });

  it("should return null when both d and B are null", () => {
    const input: DeltaCalcInput = {
      d: null,
      B: null,
    };

    const result = calculateDelta(input);

    expect(result).toBeNull();
  });

  it("should handle B = 1 correctly (result should be 0)", () => {
    const input: DeltaCalcInput = {
      d: 50,
      B: new Decimal(1),
    };

    const result = calculateDelta(input);

    expect(result!.toNumber()).toBe(0);
  });

  it("should handle B < 1 correctly (negative result)", () => {
    const input: DeltaCalcInput = {
      d: 100,
      B: new Decimal(0.5),
    };

    const result = calculateDelta(input);

    // delta = 100 * (0.5 - 1) / 2 = 100 * (-0.5) / 2 = -25
    expect(result!.toNumber()).toBe(-25);
  });

  it("should handle fractional diameter", () => {
    const input: DeltaCalcInput = {
      d: 25.5,
      B: new Decimal(3.0),
    };

    const result = calculateDelta(input);

    // delta = 25.5 * (3.0 - 1) / 2 = 25.5 * 2 / 2 = 25.5
    expect(result!.toNumber()).toBe(25.5);
  });

  it("should handle large values correctly", () => {
    const input: DeltaCalcInput = {
      d: 1000,
      B: new Decimal(10),
    };

    const result = calculateDelta(input);

    // delta = 1000 * (10 - 1) / 2 = 1000 * 9 / 2 = 4500
    expect(result!.toNumber()).toBe(4500);
  });

  it("should handle decimal precision correctly", () => {
    const input: DeltaCalcInput = {
      d: 1,
      B: new Decimal("1.0000000001"),
    };

    const result = calculateDelta(input);

    // delta = 1 * (1.0000000001 - 1) / 2 = 1 * 0.0000000001 / 2 = 0.00000000005
    expect(result!.toNumber()).toBeCloseTo(0.00000000005, 10);
  });

  it("should work with different B values", () => {
    const testCases = [
      { d: 50, B: 1.2, expected: 5 }, // 50 * (1.2 - 1) / 2 = 5
      { d: 50, B: 1.5, expected: 12.5 }, // 50 * (1.5 - 1) / 2 = 12.5
      { d: 50, B: 2.0, expected: 25 }, // 50 * (2.0 - 1) / 2 = 25
      { d: 50, B: 5.0, expected: 100 }, // 50 * (5.0 - 1) / 2 = 100
    ];

    testCases.forEach(({ d, B, expected }) => {
      const input: DeltaCalcInput = {
        d,
        B: new Decimal(B),
      };

      const result = calculateDelta(input);

      expect(result!.toNumber()).toBe(expected);
    });
  });
});
