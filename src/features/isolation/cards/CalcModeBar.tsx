import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  FLOW_MODE,
  ISOLATION_MODE,
  ISOLATION_MODE_LABEL,
  SYSTEM_MODE,
  SYSTEM_MODE_LABEL,
} from "../model/calcModes";
import { Controller, useFormContext } from "react-hook-form";
import type { CalcFormValues } from "../model/form";

export const CalcModeBar = () => {
  const { control, setValue } = useFormContext<CalcFormValues>();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Режим расчёта</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Подача + обратка / Только подача */}
          <Controller
            name="mode.system_mode"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <div className="text-sm font-medium">Режим системы</div>
                <Tabs
                  value={field.value}
                  onValueChange={(v) => {
                    field.onChange(v);
                    if (v === SYSTEM_MODE.SINGLE) {
                      setValue("mode.flow", FLOW_MODE.SUPPLY);
                    }
                  }}
                >
                  <TabsList className="w-full">
                    {Object.values(SYSTEM_MODE).map((mode) => (
                      <TabsTrigger key={mode} value={mode}>
                        {SYSTEM_MODE_LABEL[mode]}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>

                <p className="text-xs text-muted-foreground">
                  Влияет на то, для какого трубопровода производятся расчеты.
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
                <div className="flex gap-2">
                  <div className="text-sm font-medium">
                    Конструкция изоляции
                  </div>
                  <Badge className="text-xs">В разработке</Badge>
                </div>

                <Tabs value={field.value}>
                  <TabsList className="w-full">
                    {Object.values(ISOLATION_MODE).map((mode) => (
                      <TabsTrigger key={mode} value={mode} className="relative">
                        <span className="flex items-center gap-2">
                          {ISOLATION_MODE_LABEL[mode]}
                        </span>
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
