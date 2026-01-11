import { Decimal, type DecimalType } from "@/lib/decimal";

export const calculateDeltaWithCompaction = (
  delta: DecimalType | null,
  compactionFactor: number | null
) => {
  if (!delta || !compactionFactor) return null;

  return delta.mul(new Decimal(compactionFactor));
};
