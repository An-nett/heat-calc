import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export const IsolationInputsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Исходные данные</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Геометрия */}
        <section className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Геометрия
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pipeDiameter">Диаметр трубопровода</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="pipeDiameter"
                  inputMode="decimal"
                  placeholder="159"
                />
                <span className="text-sm text-muted-foreground">мм</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Наружный диаметр трубы.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wallThickness">Толщина стенки</Label>
              <div className="flex items-center gap-2">
                <Input id="wallThickness" inputMode="decimal" placeholder="4" />
                <span className="text-sm text-muted-foreground">мм</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Если не нужна в методике — можно оставить пустым.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Температуры */}
        <section className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Тепловой режим
          </h3>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="tSupply">Подача</Label>
              <div className="flex items-center gap-2">
                <Input id="tSupply" inputMode="decimal" placeholder="150" />
                <span className="text-sm text-muted-foreground">°C</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tReturn">Обратка</Label>
              <div className="flex items-center gap-2">
                <Input id="tReturn" inputMode="decimal" placeholder="70" />
                <span className="text-sm text-muted-foreground">°C</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tOutdoor">Наружная</Label>
              <div className="flex items-center gap-2">
                <Input id="tOutdoor" inputMode="decimal" placeholder="-5.6" />
                <span className="text-sm text-muted-foreground">°C</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Средняя температура отопительного периода.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Условия прокладки */}
        <section className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Условия прокладки. Влияет на термическое сопротивление Rₙ
          </h3>

          <RadioGroup
            defaultValue="outdoor"
            className="grid gap-3 sm:grid-cols-2"
          >
            <Label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/50">
              <RadioGroupItem value="outdoor" />
              <div className="space-y-0.5">
                <div className="text-sm font-medium">На открытом воздухе</div>
              </div>
            </Label>

            <Label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/50">
              <RadioGroupItem value="indoor-low" />
              <div className="space-y-0.5">
                <div className="text-sm font-medium">
                  В помещении для поверхностей с малым коэффициентом излучения
                </div>
              </div>
            </Label>

            <Label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/50">
              <RadioGroupItem value="indoor-high" />
              <div className="space-y-0.5">
                <div className="text-sm font-medium">
                  В помещении для поверхностей с высоким коэффициентом излучения
                </div>
              </div>
            </Label>
          </RadioGroup>
        </section>

        <Separator />

        {/* Способ прокладки */}
        <section className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Способ прокладки. Влияет на коэффициент K
          </h3>

          <RadioGroup
            defaultValue="outdoor"
            className="grid gap-3 sm:grid-cols-2"
          >
            <Label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/50">
              <RadioGroupItem value="outdoor" />
              <div className="space-y-0.5">
                <div className="text-sm font-medium">
                  Стальные на подвижных опорах
                </div>
              </div>
            </Label>

            <Label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/50">
              <RadioGroupItem value="indoor-low" />
              <div className="space-y-0.5">
                <div className="text-sm font-medium">
                  Стальные на подвесных опорах
                </div>
              </div>
            </Label>

            <Label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/50">
              <RadioGroupItem value="indoor-high" />
              <div className="space-y-0.5">
                <div className="text-sm font-medium">
                  Неметаллические на подвижных и подвесных опорах
                </div>
              </div>
            </Label>

            <Label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/50">
              <RadioGroupItem value="indoor-hig" />
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Бесканальная</div>
              </div>
            </Label>
          </RadioGroup>
        </section>
      </CardContent>
    </Card>
  );
};
