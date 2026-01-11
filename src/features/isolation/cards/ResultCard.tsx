import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";
import { useDerivedValues } from "../model/hooks/useDerivedValues";
import { SNIP_61_LINK } from "../constants/links";
import { Badge } from "@/components/ui/badge";

export const ResultCard = () => {
  const { delta, deltaWithCompaction } = useDerivedValues();

  const result = deltaWithCompaction ?? delta;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Результат</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-md border bg-muted/60 p-4">
          <div className="text-sm text-muted-foreground">
            Требуемая толщина теплоизоляции
          </div>

          <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
            <div className="text-4xl font-semibold tracking-tight tabular-nums">
              {result?.toFixed(1) ?? "—"}
            </div>
            <div className="pb-1 text-base text-muted-foreground">мм</div>
          </div>

          <div className="mt-3 text-xs text-muted-foreground">
            Итог получен на основе исходных данных, нормируемых величин и
            расчёта параметра B.
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Отчёт</div>
          <p className="text-sm text-muted-foreground">
            Скачайте отчёт с исходными данными, формулами, подстановками и
            ссылками на нормативы.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Скачать отчёт
              <Badge variant="secondary" className="text-xs">
                В разработке
              </Badge>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Формат: DOCX · Можно приложить к расчётной записке
          </p>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="text-sm font-medium">Нормативные ссылки</div>
          <div className="text-sm text-muted-foreground">
            <a
              href={SNIP_61_LINK}
              className="underline decoration-dotted hover:text-foreground"
            >
              СП 61.13330.2012
            </a>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Отчёт сформирован автоматически. Рекомендуется инженерная проверка
          результатов.
        </p>
      </CardContent>
    </Card>
  );
};
