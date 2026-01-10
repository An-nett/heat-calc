import { calculateInterpolation } from "@/shared/model/calculateInterpolation";
import { FLOW_MODE, type FlowMode } from "../calcModes";
import { type DecimalType, Decimal } from "@/lib/decimal";

const SUPPLY_AVG_TEMPS = [
  { temp: 95, tAvg: 65 },
  { temp: 150, tAvg: 90 },
  { temp: 180, tAvg: 110 },
];
const RETURN_AVG_TEMP = { temp: 70, tAvg: 50 };

export interface AvgTempResult {
  type: "fixed" | "interpolated";
  tAvg: DecimalType | null;
  x1: number | null;
  y1: number | null;
  x2: number | null;
  y2: number | null;
}

export function getAvgTemp(flowMode: FlowMode, temp: number): AvgTempResult {
  if (flowMode === FLOW_MODE.RETURN)
    return {
      type: "fixed",
      tAvg: new Decimal(RETURN_AVG_TEMP.tAvg),
      x1: RETURN_AVG_TEMP.temp,
      y1: null,
      x2: null,
      y2: null,
    };

  for (let i = 0; i < SUPPLY_AVG_TEMPS.length - 1; i++) {
    const { temp: x1, tAvg: y1 } = SUPPLY_AVG_TEMPS[i];
    const { temp: x2, tAvg: y2 } = SUPPLY_AVG_TEMPS[i + 1];

    if (
      temp === x1 ||
      (temp <= x1 && i === 0) ||
      i === SUPPLY_AVG_TEMPS.length - 1
    ) {
      return {
        type: "fixed",
        tAvg: new Decimal(y1),
        x1,
        y1: null,
        x2: null,
        y2: null,
      };
    }

    if (temp > x1 && temp < x2) {
      return {
        type: "interpolated",
        tAvg: calculateInterpolation({ x: temp, x1, y1, x2, y2 }),
        x1,
        y1,
        x2,
        y2,
      };
    }
  }

  return { type: "fixed", tAvg: null, x1: null, y1: null, x2: null, y2: null }; // Should not reach here
}
