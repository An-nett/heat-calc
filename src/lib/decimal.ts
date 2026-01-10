import Decimal from "decimal.js";

Decimal.set({
  precision: 20, // Общая точность вычислений
  rounding: Decimal.ROUND_HALF_UP, // Округление по математическим правилам
});

export { Decimal };
export type { Decimal as DecimalType };
