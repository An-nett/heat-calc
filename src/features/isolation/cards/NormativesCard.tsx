import { Card, CardContent } from "@/components/ui/card";
import { RnInterpolatedItem } from "./RnInterpolatedItem";
import { NormativeItem } from "@/shared/NormativeItem";
import { TvInterpolatedItem } from "./TvInterpolatedItem";
import { QlInterpolatedItem } from "./QlInterpolatedItem";
import { SNIP_61_LINK } from "../constants/links";
import { CardCustomHeader } from "../components/CardCustomHeader";
import { useDerivedValues } from "../model/hooks/useDerivedValues";

export const NormativesCard = () => {
  const { k } = useDerivedValues();

  return (
    <Card>
      <CardCustomHeader
        title="Нормируемые величины"
        description="Величины приняты по нормативным таблицам. Линейное термическое
          сопротивление Rₙ и нормируемая плотность теплового потока qₗ
          определяются интерполяцией по расчётной температуре теплоносителя tᵥ."
      />

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <NormativeItem
            title="Коэффициент дополнительных потерь, K"
            value={k ? k.toString() : "—"}
            unit="—"
            linkText="СП 61.13330.2012, таблица В.1"
            linkHref={SNIP_61_LINK}
          />

          <TvInterpolatedItem />

          <QlInterpolatedItem />

          <RnInterpolatedItem />
        </div>
      </CardContent>
    </Card>
  );
};
