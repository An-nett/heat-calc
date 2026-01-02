import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  FLOW_MODE,
  FLOW_MODE_LABEL,
  ISOLATION_MODE,
  ISOLATION_MODE_LABEL,
} from "../model/calcModes";
import { Controller, useFormContext } from "react-hook-form";
import type { CalcFormValues } from "../model/form";

export const CalcModeBar = () => {
  const { control } = useFormContext<CalcFormValues>();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Режим расчёта</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Подача / Обратка */}
          <Controller
            name="mode.flow"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <div className="text-sm font-medium">Теплоноситель</div>
                <Tabs value={field.value} onValueChange={field.onChange}>
                  <TabsList className="w-full">
                    {Object.values(FLOW_MODE).map((mode) => (
                      <TabsTrigger key={mode} value={mode}>
                        {FLOW_MODE_LABEL[mode]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>

                <p className="text-xs text-muted-foreground">
                  Влияет на расчётную температуру tᵥ и выбор табличных значений.
                </p>
              </div>
            )}
          />

          {/* Однослойная / Многослойная */}
          <Controller
            name="mode.isolation"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <div className="text-sm font-medium">Конструкция изоляции</div>

                <Tabs value={field.value} onValueChange={field.onChange}>
                  <TabsList className="w-full">
                    {Object.values(ISOLATION_MODE).map((mode) => (
                      <TabsTrigger key={mode} value={mode}>
                        {ISOLATION_MODE_LABEL[mode]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>

                <p className="text-xs text-muted-foreground">
                  Определяет, как задаются материалы: один слой или набор слоёв.
                  Многослойная изоляция применяется, если tmax применения
                  материала меньше, чем t стенки объекта.
                </p>
              </div>
            )}
          />
        </div>

        {/* Уплотнение */}
        <Controller
          name="mode.compaction"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2 rounded-md border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">Уплотняемые материалы</div>
                <p className="text-xs text-muted-foreground">
                  Добавляет поправку к толщине (проектная толщина с учётом
                  уплотнения).
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="compaction" className="text-sm">
                  Учитывать
                </Label>
              </div>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};
