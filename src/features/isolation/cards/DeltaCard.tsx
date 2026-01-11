import "katex/dist/katex.min.css";

import { BlockMath } from "react-katex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDerivedValues } from "../model/hooks/useDerivedValues";
import { useFormContext, useWatch } from "react-hook-form";
import type { CalcFormValues } from "../model/form";

export const DeltaCard = () => {
  const { control } = useFormContext<CalcFormValues>();
  const { inputs } = useWatch({ control });
  const { delta, B } = useDerivedValues();

  const d = inputs?.pipe_outer_diameter ?? 0;
  const b = B?.toFixed(4) ?? 0;
  const deltaValue = delta?.toFixed(1) ?? 0;

  const formula = String.raw`\delta = \frac{d\,(B - 1)}{2}`;

  const substitution = String.raw`\delta = \frac{${d}\cdot(${b} - 1)}{2} = ${deltaValue}\ \text{мм}`;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">
          Шаг 2. Расчёт толщины теплоизоляции δ
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Определяем требуемую толщину теплоизоляции по найденному параметру B и
          наружному диаметру трубопровода.
        </p>

        <div className="rounded-md border">
          {/* Формула */}
          <div className="p-4">
            <div className="text-xs font-medium text-muted-foreground">
              Формула
            </div>
            <div className="mt-2 overflow-x-auto [&_.katex]:text-[0.98rem]">
              <BlockMath math={formula} />
            </div>
          </div>

          <Separator />

          {/* Подстановка */}
          <div className="p-4">
            <div className="text-xs font-medium text-muted-foreground">
              Подстановка
            </div>
            <div className="mt-2 overflow-x-auto [&_.katex]:text-[0.98rem]">
              <BlockMath math={substitution} />
            </div>
          </div>
        </div>

        <a
          href="#"
          className="text-xs text-muted-foreground underline decoration-dotted hover:text-foreground"
        >
          СП 41.103.2000 — формула расчёта толщины теплоизоляции
        </a>
      </CardContent>
    </Card>
  );
};
