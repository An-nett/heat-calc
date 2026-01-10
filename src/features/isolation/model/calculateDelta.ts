import { type DecimalType, Decimal } from "@/lib/decimal";

export type DeltaCalcInput = {
  d: number | null; // наружный диаметр трубопровода
  B: DecimalType | null; // коэффициент B
};

export const calculateDelta = ({
  d,
  B,
}: DeltaCalcInput): DecimalType | null => {
  if (!d || !B) return null;

  const dD = new Decimal(d);

  return dD.mul(B.minus(1)).div(2);
};
