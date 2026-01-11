import "katex/dist/katex.min.css";

import { BlockMath } from "react-katex";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDerivedValues } from "../model/hooks/useDerivedValues";
import type { CalcFormValues } from "../model/form";
import { useFormContext, useWatch } from "react-hook-form";
import { CardCustomHeader } from "../components/CardCustomHeader";

export const LnBCard = () => {
  const { control } = useFormContext<CalcFormValues>();
  const { inputs } = useWatch({ control });

  const { k, tAvgResult, ql, rn, lnB, B } = useDerivedValues();

  const tAvg = tAvgResult?.tAvg?.toFixed(0) ?? 0;
  const q_l = ql?.result.exact.toFixed(1) ?? 0;
  const r_n = rn?.result.exact.toFixed(2) ?? 0;
  const lambda = inputs?.material?.main?.lambda ?? 0;
  const tn = inputs?.t_ambient ?? 0;

  // формула (красивая, с индексами)
  const formula = String.raw`\ln B = 2\pi\lambda\left(\frac{K\,(t_v - t_n)}{q_l} - R_n\right)`;

  // подстановка (тоже KaTeX)
  const substitution = String.raw`\ln B = 2\cdot 3.14\cdot ${lambda}\left(\frac{${k}\cdot\left(${tAvg} - (${tn})\right)}{${q_l}} - ${r_n}\right)`;

  return (
    <Card>
      <CardCustomHeader
        title="Шаг 1. Расчёт ln(B) и B"
        description="Вычисление вспомогательного параметра B для определения требуемой
            толщины теплоизоляции."
      />

      <CardContent className="space-y-6">
        <div className="rounded-md border">
          {/* Формула */}
          <div className="p-4 bg-muted/60">
            <div className="text-xs font-medium text-muted-foreground">
              Формула
            </div>
            <div className="mt-2 overflow-x-auto">
              <BlockMath math={formula} />
            </div>
          </div>

          <Separator />

          {/* Подстановка */}
          <div className="p-4">
            <div className="text-xs font-medium text-muted-foreground">
              Подстановка
            </div>
            <div className="mt-2 overflow-x-auto">
              <BlockMath math={substitution} />
            </div>
          </div>

          <Separator />

          {/* Результат */}
          <div className="p-4 bg-muted/60">
            <div className="text-xs font-medium text-muted-foreground">
              Результат
            </div>

            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border p-3 bg-white">
                <div className="text-xs text-muted-foreground">ln(B)</div>
                <div className="mt-1 text-xl font-semibold tabular-nums">
                  {lnB?.toFixed(6) ?? "—"}
                </div>
              </div>

              <div className="rounded-md border p-3 bg-white">
                <div className="text-xs text-muted-foreground">B</div>
                <div className="mt-1 text-xl font-semibold tabular-nums">
                  {B?.toFixed(4) ?? "—"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
