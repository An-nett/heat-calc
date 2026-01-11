import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDerivedValues } from "../model/hooks/useDerivedValues";
import { useFormContext, useWatch } from "react-hook-form";
import type { CalcFormValues } from "../model/form";
import { SNIP_61_LINK } from "../constants/links";

export const TvInterpolatedItem = () => {
  const { control } = useFormContext<CalcFormValues>();

  const { inputs } = useWatch({ control });

  const { tAvgResult } = useDerivedValues();

  const renderDescription = () => {
    if (!tAvgResult) return "Данные отсутствуют";

    if (tAvgResult.type === "fixed")
      return `Фиксированное значение при t ${tAvgResult.x1 ?? "—"}°C: tᵥ = ${
        tAvgResult.tAvg ?? "—"
      }°C`;

    return `Интерполяция по t подачи = ${inputs?.t_supply ?? "—"}°C между ${
      tAvgResult.x1
    }°C и ${tAvgResult.x2}°C`;
  };

  return (
    <div className="rounded-md border p-4 bg-muted/60">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-medium">
            Расчётная температура теплоносителя, tᵥ
          </div>
          <div className="text-xs text-muted-foreground">
            {renderDescription()}
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-semibold tabular-nums">
            {tAvgResult?.tAvg ? tAvgResult.tAvg.toFixed(0) : "—"}
          </div>
          <div className="text-xs text-muted-foreground">°C</div>
        </div>
      </div>

      <Separator className="my-3" />

      {tAvgResult && tAvgResult.type === "interpolated" ? (
        <Accordion type="single" collapsible>
          <AccordionItem value="points" className="border-0">
            <AccordionTrigger className="py-0 text-xs text-muted-foreground hover:text-foreground">
              Показать опорные точки
            </AccordionTrigger>
            <AccordionContent className="pt-3">
              <div className="grid gap-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>{tAvgResult.x1}°C</span>
                  <span className="tabular-nums">tᵥ = {tAvgResult.y1}</span>
                </div>

                <div className="flex justify-between">
                  <span>{tAvgResult.x2}°C</span>
                  <span className="tabular-nums">tᵥ = {tAvgResult.y2}</span>
                </div>

                <div className="pt-2">
                  <span>
                    Источник:{" "}
                    <a
                      href={SNIP_61_LINK}
                      className="underline decoration-dotted hover:text-foreground"
                      target="_blank"
                      rel="noreferrer"
                    >
                      СП 61.13330.2012, табл. 15
                    </a>
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <a
          href={SNIP_61_LINK}
          className="text-xs text-muted-foreground underline decoration-dotted hover:text-foreground"
          target="_blank"
          rel="noreferrer"
        >
          СП 61.13330.2012, табл. 15
        </a>
      )}
    </div>
  );
};
