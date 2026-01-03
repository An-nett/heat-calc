import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDerivedValues } from "../model/hooks/useDerivedValues";

export const QlInterpolatedItem = () => {
  const { ql } = useDerivedValues();

  return (
    <div className="rounded-md border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-medium">
            Нормируемая плотность теплового потока, qₗ
          </div>
          <div className="text-xs text-muted-foreground">
            Интерполяция по tᵥ = {130}°C между {100}°C и {150}°C
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
              <div className="flex justify-between">
                <span>{95}°C</span>
                <span className="tabular-nums">qₗ = {65}</span>
              </div>

              <div className="flex justify-between">
                <span>{150}°C</span>
                <span className="tabular-nums">qₗ = {90}</span>
              </div>

              <div className="pt-2">
                <span>
                  Источник:{" "}
                  <a
                    href="#"
                    className="underline decoration-dotted hover:text-foreground"
                    target="_blank"
                    rel="noreferrer"
                  >
                    СП 61.13330.2012, табл. 2
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
