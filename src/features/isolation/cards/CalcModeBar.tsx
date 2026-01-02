import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const CalcModeBar = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Режим расчёта</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Подача / Обратка */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Теплоноситель</div>

            <Tabs defaultValue="supply">
              <TabsList className="w-full">
                <TabsTrigger value="supply" className="flex-1">
                  Подача
                </TabsTrigger>
                <TabsTrigger value="return" className="flex-1">
                  Обратка
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <p className="text-xs text-muted-foreground">
              Влияет на расчётную температуру tᵥ и выбор табличных значений.
            </p>
          </div>

          {/* Однослойная / Многослойная */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Конструкция изоляции</div>

            <Tabs defaultValue="single">
              <TabsList className="w-full">
                <TabsTrigger value="single" className="flex-1">
                  Однослойная
                </TabsTrigger>
                <TabsTrigger value="multi" className="flex-1">
                  Многослойная
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <p className="text-xs text-muted-foreground">
              Определяет, как задаются материалы: один слой или набор слоёв.
            </p>
          </div>
        </div>

        {/* Уплотнение */}
        <div className="flex flex-col gap-2 rounded-md border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="text-sm font-medium">Уплотняемые материалы</div>
            <p className="text-xs text-muted-foreground">
              Добавляет поправку к толщине (проектная толщина с учётом
              уплотнения).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Switch id="compaction" defaultChecked={false} />
            <Label htmlFor="compaction" className="text-sm">
              Учитывать
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
