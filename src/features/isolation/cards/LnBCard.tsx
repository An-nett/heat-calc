import "katex/dist/katex.min.css";

import { BlockMath } from "react-katex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const LnBCard = () => {
  // заглушки (потом подставишь реальные значения)
  const lambda = 0.04;
  const K = 1.15;
  const tv = 90;
  const tn = -5.6;
  const ql = 38.2;
  const Rn = 0.05;

  const lnB = 0.781436;
  const B = 2.1846;

  // формула (красивая, с индексами)
  const formula = String.raw`\ln B = 2\pi\lambda\left(\frac{K\,(t_v - t_n)}{q_l} - R_n\right)`;

  // подстановка (тоже KaTeX)
  const substitution = String.raw`\ln B = 2\cdot 3.14\cdot ${lambda}\left(\frac{${K}\cdot\left(${tv} - (${tn})\right)}{${ql}} - ${Rn}\right)`;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Шаг 1. Расчёт ln(B) и B</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Вычисление вспомогательного параметра B для определения требуемой
          толщины теплоизоляции.
        </p>

        <div className="rounded-md border">
          {/* Формула */}
          <div className="p-4">
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
          <div className="p-4">
            <div className="text-xs font-medium text-muted-foreground">
              Результат
            </div>

            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border bg-muted/30 p-3">
                <div className="text-xs text-muted-foreground">ln(B)</div>
                <div className="mt-1 text-xl font-semibold tabular-nums">
                  {lnB}
                </div>
              </div>

              <div className="rounded-md border bg-muted/30 p-3">
                <div className="text-xs text-muted-foreground">B</div>
                <div className="mt-1 text-xl font-semibold tabular-nums">
                  {B}
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#"
          className="text-xs text-muted-foreground underline decoration-dotted hover:text-foreground"
        >
          СП 41.103.2000 — формула расчёта параметра B
        </a>
      </CardContent>
    </Card>
  );
};
