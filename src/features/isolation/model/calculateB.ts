import Decimal from "decimal.js";

export interface LnBCalcInput {
  lambda: number | null; // λ
  K: Decimal | null; // K
  tAvg: Decimal | null; // t_v
  t_n: number | null; // t_n
  ql: Decimal | null; // q_l
  rn: Decimal | null; // R_n
}

export interface LnBCalcOutput {
  lnB: Decimal | null;
  B: Decimal | null;
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

  const twoPi = new Decimal(2).mul(Decimal.acos(-1)); // 2π без хардкода

  const inner = K.mul(tAvg.minus(dTn)) // K · (t_v − t_n)
    .div(ql) // / q_l
    .minus(rn); // − R_n

  const lnB = twoPi.mul(dLambda).mul(inner);

  return {
    lnB,
    B: Decimal.exp(lnB),
  };
};
