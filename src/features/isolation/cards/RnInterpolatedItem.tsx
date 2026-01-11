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

export const RnInterpolatedItem = () => {
  const { control } = useFormContext<CalcFormValues>();
  const { inputs } = useWatch({ control });
  const { rn, tAvgResult } = useDerivedValues();

  const tAvgAsNumber = tAvgResult?.tAvg ? +tAvgResult.tAvg.toFixed(0) : null;

  const renderDescription = () => {
    if (!rn) return "Данные отсутствуют";
    return `Билинейная интерполяция по D = ${
      inputs?.pipe_inner_diameter ?? "—"
    } мм и tᵥ = ${tAvgAsNumber ?? "—"}°C`;
  };

  return (
    <div className="rounded-md border p-4 bg-muted/60">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-medium">
            Линейное термическое сопротивление, Rₙ
          </div>
          <div className="text-xs text-muted-foreground">
            {renderDescription()}
            {tAvgAsNumber && tAvgAsNumber < 100
              ? " (при tᵥ < 100°C используется значение при tᵥ = 100°C)"
              : ""}
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-semibold tabular-nums">
            {rn?.result.exact.toFixed(2) ?? "—"}
          </div>
          <div className="text-xs text-muted-foreground">м·°C/Вт</div>
        </div>
      </div>

      <Separator className="my-3" />

      <Accordion type="single" collapsible>
        <AccordionItem value="points" className="border-0">
          <AccordionTrigger className="py-0 text-xs text-muted-foreground hover:text-foreground">
            Показать опорные точки
          </AccordionTrigger>

          <AccordionContent className="pt-3">
            <div className="grid gap-2 text-xs text-muted-foreground">
              {rn && (
                <>
                  <div className="flex justify-between">
                    <span>
                      D = {rn.axes.y1} мм, tᵥ = {rn.axes.x1}°C
                    </span>
                    <span className="tabular-nums">
                      Rₙ = {rn.tablePoints.z11.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      D = {rn.axes.y2} мм, tᵥ = {rn.axes.x1}°C
                    </span>
                    <span className="tabular-nums">
                      Rₙ = {rn.tablePoints.z12.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      D = {rn.axes.y1} мм, tᵥ = {rn.axes.x2}°C
                    </span>
                    <span className="tabular-nums">
                      Rₙ = {rn.tablePoints.z21.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      D = {rn.axes.y2} мм, tᵥ = {rn.axes.x2}°C
                    </span>
                    <span className="tabular-nums">
                      Rₙ = {rn.tablePoints.z22.toFixed(2)}
                    </span>
                  </div>
                </>
              )}

              <div className="pt-2">
                <span>
                  Источник:{" "}
                  <a
                    href={SNIP_61_LINK}
                    className="underline decoration-dotted hover:text-foreground"
                    target="_blank"
                    rel="noreferrer"
                  >
                    СП 61.13330.2012, табл. B.3
                  </a>
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
