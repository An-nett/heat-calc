import { describe, it, expect } from "vitest";
import {
  calculateB,
  type LnBCalcInput,
} from "@/features/isolation/model/calculateB";
import { Decimal } from "@/lib/decimal";

describe("calculateB", () => {
  it("should calculate B correctly with valid inputs", () => {
    const input: LnBCalcInput = {
      lambda: 0.5,
      K: new Decimal(1.2),
      tAvg: new Decimal(25),
      t_n: 20,
      ql: new Decimal(100),
      rn: new Decimal(0.5),
    };

    const result = calculateB(input);

    expect(result.lnB!.toFixed(4)).toBe("-1.3823"); // Pre-calculated expected value
    expect(result.B!.toFixed(3)).toBe("0.251"); // Pre-calculated expected value
  });

  it("should return null values when lambda is null", () => {
    const input: LnBCalcInput = {
      lambda: null,
      K: new Decimal(1.2),
      tAvg: new Decimal(25),
      t_n: 20,
      ql: new Decimal(100),
      rn: new Decimal(0.5),
    };

    const result = calculateB(input);

    expect(result.lnB).toBeNull();
    expect(result.B).toBeNull();
  });

  it("should return null values when K is null", () => {
    const input: LnBCalcInput = {
      lambda: 0.5,
      K: null,
      tAvg: new Decimal(25),
      t_n: 20,
      ql: new Decimal(100),
      rn: new Decimal(0.5),
    };

    const result = calculateB(input);

    expect(result.lnB).toBeNull();
    expect(result.B).toBeNull();
  });

  it("should return null values when tAvg is null", () => {
    const input: LnBCalcInput = {
      lambda: 0.5,
      K: new Decimal(1.2),
      tAvg: null,
      t_n: 20,
      ql: new Decimal(100),
      rn: new Decimal(0.5),
    };

    const result = calculateB(input);

    expect(result.lnB).toBeNull();
    expect(result.B).toBeNull();
  });

  it("should return null values when t_n is null", () => {
    const input: LnBCalcInput = {
      lambda: 0.5,
      K: new Decimal(1.2),
      tAvg: new Decimal(25),
      t_n: null,
      ql: new Decimal(100),
      rn: new Decimal(0.5),
    };

    const result = calculateB(input);

    expect(result.lnB).toBeNull();
    expect(result.B).toBeNull();
  });

  it("should return null values when ql is null", () => {
    const input: LnBCalcInput = {
      lambda: 0.5,
      K: new Decimal(1.2),
      tAvg: new Decimal(25),
      t_n: 20,
      ql: null,
      rn: new Decimal(0.5),
    };

    const result = calculateB(input);

    expect(result.lnB).toBeNull();
    expect(result.B).toBeNull();
  });

  it("should return null values when rn is null", () => {
    const input: LnBCalcInput = {
      lambda: 0.5,
      K: new Decimal(1.2),
      tAvg: new Decimal(25),
      t_n: 20,
      ql: new Decimal(100),
      rn: null,
    };

    const result = calculateB(input);

    expect(result.lnB).toBeNull();
    expect(result.B).toBeNull();
  });

  it("should handle zero inner calculation correctly", () => {
    // Set up inputs so that K * (t_v - t_n) / q_l - R_n = 0
    const input: LnBCalcInput = {
      lambda: 0.5,
      K: new Decimal(1),
      tAvg: new Decimal(20), // t_v = t_n
      t_n: 20,
      ql: new Decimal(1),
      rn: new Decimal(0), // So inner = 0
    };

    const result = calculateB(input);

    expect(result.lnB!.toNumber()).toBe(0);
    expect(result.B!.toNumber()).toBe(1); // exp(0) = 1
  });
});
