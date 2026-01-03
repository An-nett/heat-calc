import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RnInterpolatedItem } from "./RnInterpolatedItem";
import { NormativeItem } from "@/shared/NormativeItem";
import { TvInterpolatedItem } from "./TvInterpolatedItem";
import { QlInterpolatedItem } from "./QlInterpolatedItem";
import type { CalcFormValues } from "../model/form";
import { useWatch, useFormContext } from "react-hook-form";
import { getK } from "../model/normatives/kTable";

export const NormativesCard = () => {
  const { control } = useFormContext<CalcFormValues>();

  const layingMethod = useWatch({ control, name: "inputs.laying_method" });
  const pipeDiameter = useWatch({ control, name: "inputs.pipe_diameter" });

  const k = getK(layingMethod, pipeDiameter);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Нормируемые величины</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Величины приняты по нормативным таблицам. Линейное термическое
          сопротивление Rₙ и нормируемая плотность теплового потока qₗ
          определяются интерполяцией по расчётной температуре теплоносителя tᵥ.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <NormativeItem
            title="Коэффициент дополнительных потерь, K"
            value={k ? k.toString() : "—"}
            unit="—"
            linkText="СП 41.103.2000, табл. 1"
            linkHref="#"
          />

          <TvInterpolatedItem />

          <QlInterpolatedItem />

          <RnInterpolatedItem />
        </div>
      </CardContent>
    </Card>
  );
};
