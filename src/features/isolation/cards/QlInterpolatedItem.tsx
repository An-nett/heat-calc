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
import { getQlSnipTable } from "../model/normatives/qlTable";

export const QlInterpolatedItem = () => {
  const { control } = useFormContext<CalcFormValues>();
  const { inputs } = useWatch({ control });
  const { ql, tAvgResult } = useDerivedValues();

  const snipTableNum = getQlSnipTable(
    inputs?.laying_condition,
    inputs?.working_hours
  );

  const renderDescription = () => {
    if (!ql) return "Данные отсутствуют";
    return `Билинейная интерполяция по D = ${
      inputs?.pipe_inner_diameter ?? "—"
    } мм и tᵥ = ${tAvgResult?.tAvg?.toFixed(0) ?? "—"}°C`;
  };

  return (
    <div className="rounded-md border p-4 bg-muted/60">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-medium">
            Нормируемая плотность теплового потока, qₗ
          </div>
          <div className="text-xs text-muted-foreground">
            {renderDescription()}
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-semibold tabular-nums">
            {ql?.result.exact.toFixed(1) ?? "—"}
          </div>
          <div className="text-xs text-muted-foreground">Вт/м</div>
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
              {ql && (
                <>
                  <div className="flex justify-between">
                    <span>
                      D = {ql.axes.y1} мм, tᵥ = {ql.axes.x1}°C
                    </span>
                    <span className="tabular-nums">
                      qₗ = {ql.tablePoints.z11.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      D = {ql.axes.y2} мм, tᵥ = {ql.axes.x1}°C
                    </span>
                    <span className="tabular-nums">
                      qₗ = {ql.tablePoints.z12.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      D = {ql.axes.y1} мм, tᵥ = {ql.axes.x2}°C
                    </span>
                    <span className="tabular-nums">
                      qₗ = {ql.tablePoints.z21.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      D = {ql.axes.y2} мм, tᵥ = {ql.axes.x2}°C
                    </span>
                    <span className="tabular-nums">
                      qₗ = {ql.tablePoints.z22.toFixed(1)}
                    </span>
                  </div>
                </>
              )}

              <div className="pt-2">
                <span>
                  Источник:{" "}
                  <a
                    href="#"
                    className="underline decoration-dotted hover:text-foreground"
                    target="_blank"
                    rel="noreferrer"
                  >
                    СП 61.13330.2012{" "}
                    {snipTableNum ? `, табл. ${snipTableNum}` : ""}
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
