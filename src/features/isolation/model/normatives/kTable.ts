import { type DecimalType, Decimal } from "@/lib/decimal";
import { type LayingMethod } from "../calcModes";

const K_CONST: Record<Exclude<LayingMethod, "steel_movable">, number> = {
  steel_suspended: 1.05,
  nonmetal: 1.7,
  trenchless: 1.15,
};

const K_STEEL_MOVABLE_BELOW_150 = 1.2;
const K_STEEL_MOVABLE_FROM_150 = 1.15;

export const getK = (
  layingMethod: LayingMethod,
  diameterMm: number | null | undefined
): DecimalType | null => {
  if (layingMethod === "steel_movable") {
    if (diameterMm == null || Number.isNaN(diameterMm)) {
      return null;
    }

    const k =
      diameterMm < 150 ? K_STEEL_MOVABLE_BELOW_150 : K_STEEL_MOVABLE_FROM_150;

    return new Decimal(k);
  }

  return new Decimal(K_CONST[layingMethod]);
};
