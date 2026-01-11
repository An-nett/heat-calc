import {
  interpolate2DDecimal,
  type BilinearInterpolationResult,
  type Table2D,
} from "@/shared/model/calcualteBilinearInterpolation";
import { LAYING_CONDITION, type LayingCondition } from "../calcModes";
import { type DecimalType } from "@/lib/decimal";

const AXES = {
  x: [100, 300, 500],
  y: [
    32, 40, 50, 100, 125, 150, 200, 250, 300, 350, 400, 500, 600, 700, 800, 900,
    1000, 2000,
  ],
} as const;

const RN_BY_LAYING_CONDITION: Record<LayingCondition, Table2D> = {
  [LAYING_CONDITION.INDOOR_LOW_EMITTING]: {
    x: [...AXES.x],
    y: [...AXES.y],
    values: [
      [0.5, 0.35, 0.3],
      [0.45, 0.3, 0.25],
      [0.4, 0.25, 0.2],
      [0.25, 0.19, 0.15],
      [0.21, 0.17, 0.13],
      [0.18, 0.15, 0.11],
      [0.16, 0.13, 0.1],
      [0.13, 0.1, 0.09],
      [0.11, 0.09, 0.08],
      [0.1, 0.08, 0.07],
      [0.09, 0.07, 0.06],
      [0.075, 0.065, 0.06],
      [0.062, 0.055, 0.05],
      [0.055, 0.051, 0.045],
      [0.048, 0.045, 0.042],
      [0.044, 0.041, 0.038],
      [0.04, 0.037, 0.034],
      [0.022, 0.02, 0.017],
    ],
  },
  [LAYING_CONDITION.INDOOR_HIGH_EMITTING]: {
    x: [...AXES.x],
    y: [...AXES.y],
    values: [
      [0.33, 0.22, 0.17],
      [0.29, 0.2, 0.15],
      [0.25, 0.17, 0.13],
      [0.15, 0.11, 0.1],
      [0.13, 0.1, 0.09],
      [0.12, 0.09, 0.08],
      [0.1, 0.08, 0.07],
      [0.09, 0.07, 0.06],
      [0.08, 0.07, 0.06],
      [0.07, 0.06, 0.05],
      [0.06, 0.05, 0.04],
      [0.05, 0.045, 0.04],
      [0.043, 0.038, 0.035],
      [0.038, 0.035, 0.032],
      [0.034, 0.031, 0.029],
      [0.031, 0.028, 0.026],
      [0.028, 0.026, 0.024],
      [0.015, 0.014, 0.013],
    ],
  },
  [LAYING_CONDITION.OUTDOOR]: {
    x: [...AXES.x],
    y: [...AXES.y],
    values: [
      [0.12, 0.09, 0.07],
      [0.1, 0.07, 0.05],
      [0.09, 0.06, 0.04],
      [0.07, 0.05, 0.04],
      [0.05, 0.04, 0.03],
      [0.05, 0.04, 0.03],
      [0.04, 0.03, 0.03],
      [0.03, 0.03, 0.02],
      [0.03, 0.02, 0.02],
      [0.03, 0.02, 0.02],
      [0.02, 0.02, 0.02],
      [0.02, 0.02, 0.016],
      [0.017, 0.015, 0.014],
      [0.015, 0.013, 0.012],
      [0.013, 0.012, 0.011],
      [0.012, 0.011, 0.01],
      [0.011, 0.01, 0.009],
      [0.006, 0.006, 0.005],
    ],
  },
};

export function getRn(
  LayingCondition: LayingCondition,
  pipe_diameter: number | null,
  tAvg: DecimalType | null
): BilinearInterpolationResult | null {
  if (!pipe_diameter || !tAvg) {
    return null;
  }
  const tAvgNumber = tAvg.toNumber();
  return interpolate2DDecimal(
    RN_BY_LAYING_CONDITION[LayingCondition],
    Math.max(100, tAvgNumber),
    pipe_diameter
  );
}
