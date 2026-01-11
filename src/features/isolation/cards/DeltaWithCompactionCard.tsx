import "katex/dist/katex.min.css";

import { BlockMath } from "react-katex";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDerivedValues } from "../model/hooks/useDerivedValues";
import { useFormContext, useWatch } from "react-hook-form";
import type { CalcFormValues } from "../model/form";
import { CardCustomHeader } from "../components/CardCustomHeader";

export const DeltaWithCompactionCard = () => {
  const { control } = useFormContext<CalcFormValues>();
  const { inputs } = useWatch({ control });
  const { delta, deltaWithCompaction } = useDerivedValues();

  const deltaValue = delta?.toFixed(1) ?? 0;
  const compactionFactor = inputs?.material?.main?.compaction_factor ?? 0;
  const deltaWithCompactionValue = deltaWithCompaction?.toFixed(1) ?? 0;

  const formula = String.raw`\delta_{упл} = \delta \cdot K_{упл}`;

  const substitution = String.raw`\delta_{упл} = ${deltaValue} \cdot ${compactionFactor} = ${deltaWithCompactionValue}\ \text{мм}`;

  return (
    <Card>
      <CardCustomHeader
        title="Шаг 3. Расчёт толщины теплоизоляции с учётом уплотнения δупл"
        description="Определяем проектную толщину теплоизоляции с учётом коэффициента
            уплотнения материала."
      />

      <CardContent className="space-y-6">
        <div className="rounded-md border">
          {/* Формула */}
          <div className="p-4 bg-muted/60">
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
      </CardContent>
    </Card>
  );
};
