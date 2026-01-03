import type Decimal from "decimal.js";
import { FLOW_MODE } from "./calcModes";
import type { CalcFormValues } from "./form";
import { getK } from "./normatives/kTable";
import { getAvgTemp, type AvgTempResult } from "./normatives/tAvgTable";
import { getQl } from "./normatives/qlTable";
import type { BilinearInterpolationResult } from "@/shared/model/calcualteBilinearInterpolation";

export interface DerivedValues {
  tAvgResult: AvgTempResult | null;
  k: Decimal | null; // Коэффициент дополнительных потерь, —
  ql: BilinearInterpolationResult | null; // Нормируемая плотность теплового потока, Вт/м
}

export const calculateDerivedValues = (
  values: CalcFormValues
): DerivedValues => {
  const temp =
    values.mode.flow === FLOW_MODE.SUPPLY
      ? values.inputs.t_supply
      : values.inputs.t_return;

  const tAvgResult = temp !== null ? getAvgTemp(values.mode.flow, temp) : null;
  const k = getK(values.inputs.laying_method, values.inputs.pipe_diameter);
  const ql = getQl(values.inputs.pipe_diameter, tAvgResult?.tAvg ?? null);

  return {
    tAvgResult,
    k,
    ql,
  };
};
