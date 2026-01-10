import { type DecimalType, Decimal } from "@/lib/decimal";

export interface LnBCalcInput {
  lambda: number | null; // λ
  K: DecimalType | null; // K
  tAvg: DecimalType | null; // t_v
  t_n: number | null; // t_n
  ql: DecimalType | null; // q_l
  rn: DecimalType | null; // R_n
}

export interface LnBCalcOutput {
  lnB: DecimalType | null;
  B: DecimalType | null;
}

export const calculateB = ({
  lambda,
  K,
  tAvg,
  t_n,
  ql,
  rn,
}: LnBCalcInput): LnBCalcOutput => {
  if (!K || !tAvg || !t_n || !ql || !rn || !lambda)
    return { lnB: null, B: null };

  const dLambda = new Decimal(lambda);
  const dTn = new Decimal(t_n);

  const twoPi = new Decimal(2).mul(Math.PI); // 2π без хардкода

  const inner = K.mul(tAvg.minus(dTn)) // K · (t_v − t_n)
    .div(ql) // / q_l
    .minus(rn); // − R_n

  const lnB = twoPi.mul(dLambda).mul(inner);

  return {
    lnB,
    B: Decimal.exp(lnB),
  };
};
