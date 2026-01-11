import { type DecimalType } from "@/lib/decimal";
import { FLOW_MODE } from "./calcModes";
import type { CalcFormValues } from "./form";
import { getK } from "./normatives/kTable";
import { getAvgTemp, type AvgTempResult } from "./normatives/tAvgTable";
import { getQl } from "./normatives/qlTable";
import type { BilinearInterpolationResult } from "@/shared/model/calcualteBilinearInterpolation";
import { getRn } from "./normatives/RnTable";
import { calculateB } from "./calculateB";
import { calculateDelta } from "./calculateDelta";

export interface DerivedValues {
  tAvgResult: AvgTempResult | null; // Средняя температура теплоносителя, °C
  k: DecimalType | null; // Коэффициент дополнительных потерь, —
  ql: BilinearInterpolationResult | null; // Нормируемая плотность теплового потока, Вт/м
  rn: BilinearInterpolationResult | null; // Линейное термическое сопротивление B, м·°C/Вт
  lnB: DecimalType | null;
  B: DecimalType | null;
  delta: DecimalType | null;
}

export const calculateDerivedValues = (
  values: CalcFormValues
): DerivedValues => {
  const temp =
    values.mode.flow === FLOW_MODE.SUPPLY
      ? values.inputs.t_supply
      : values.inputs.t_return;

  const tAvgResult = temp !== null ? getAvgTemp(values.mode.flow, temp) : null;
  const k = getK(
    values.inputs.laying_method,
    values.inputs.pipe_inner_diameter
  );
  const ql = getQl(
    values.inputs.pipe_inner_diameter,
    tAvgResult?.tAvg ?? null,
    values.inputs.laying_condition,
    values.inputs.working_hours
  );
  const rn = getRn(
    values.inputs.laying_condition,
    values.inputs.pipe_inner_diameter,
    tAvgResult?.tAvg ?? null
  );

  const { lnB, B } = calculateB({
    lambda: values.inputs.material.main.lambda,
    K: k,
    tAvg: tAvgResult?.tAvg ?? null,
    t_n: values.inputs.t_ambient,
    ql: ql?.result.exact ?? null,
    rn: rn?.result.exact ?? null,
  });
  const delta = calculateDelta({
    d: values.inputs.pipe_outer_diameter,
    B,
  });

  return {
    tAvgResult,
    k,
    ql,
    rn,
    lnB,
    B,
    delta,
  };
};
