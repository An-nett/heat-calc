import Decimal from "decimal.js";

export type DeltaCalcInput = {
  d: number | null; // наружный диаметр трубопровода
  B: Decimal | null; // коэффициент B
};

export const calculateDelta = ({ d, B }: DeltaCalcInput): Decimal | null => {
  if (!d || !B) return null;

  const dD = new Decimal(d);

  return dD.mul(B.minus(1)).div(2);
};
