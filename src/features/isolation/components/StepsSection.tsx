import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FLOW_MODE, FLOW_MODE_LABEL, SYSTEM_MODE } from "../model/calcModes";

/**
 * Враппер секции "Ход расчёта" в стиле, как на макете:
 * - header-strip с левой акцентной линией
 * - кнопка "Показать/Скрыть" справа
 * - внутри любые карточки шагов (не вложены визуально, просто показываются/скрываются)
 */
export const StepsSection = ({ children }: React.PropsWithChildren) => {
  const { control } = useFormContext();

  const isDualMode =
    useWatch({ control, name: "mode.system_mode" }) === SYSTEM_MODE.DUAL;

  const [open, setOpen] = React.useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {/* Header strip */}
      <div className="relative overflow-hidden rounded-lg border bg-muted/60 my-8">
        <div className="absolute left-0 top-0 h-full w-1 bg-primary/50" />

        <div className="flex items-start justify-between gap-3 px-4 py-3">
          <div className="min-w-0 pl-2">
            <div className="text-lg font-medium">Ход расчёта</div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              формулы · подстановка · нормативы
            </div>
          </div>

          <div className="flex gap-6">
            {isDualMode ? (
              <Controller
                name="mode.flow"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Tabs value={field.value} onValueChange={field.onChange}>
                      <TabsList className="w-full">
                        {Object.values(FLOW_MODE).map((mode) => (
                          <TabsTrigger key={mode} value={mode}>
                            {FLOW_MODE_LABEL[mode]}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                )}
              />
            ) : null}

            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="shrink-0 gap-2">
                {open ? "Скрыть" : "Показать"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
      </div>

      {/* Content */}
      <CollapsibleContent>
        <div className="mt-4 space-y-6">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};
