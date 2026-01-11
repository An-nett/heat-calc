import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import type { CalcFormValues } from "../model/form";
import {
  ISOLATION_MODE,
  LAYING_CONDITION,
  LAYING_CONDITION_LABEL,
  LAYING_METHOD,
  LAYING_METHOD_LABEL,
  WORKING_HOURS_PER_YEAR,
  WORKING_HOURS_PER_YEAR_LABEL,
} from "../model/calcModes";

export const IsolationInputsCard = () => {
  const { control } = useFormContext<CalcFormValues>();
  const isMultiLayer =
    useWatch({
      control,
      name: "mode.isolation",
    }) === ISOLATION_MODE.MULTI;
  const isCompactionOn = useWatch({
    control,
    name: "mode.compaction",
  });

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

          <div className="grid gap-4 sm:grid-cols-3">
            <Controller
              name="inputs.pipe_outer_diameter"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>
                    Наружный диаметр трубопровода
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={field.value ?? ""}
                      placeholder="0"
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber ?? null)
                      }
                    />
                    <span className="text-sm text-muted-foreground">мм</span>
                  </div>
                </div>
              )}
            />

            <Controller
              name="inputs.pipe_inner_diameter"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>
                    Внутренний диаметр трубопровода
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={field.value ?? ""}
                      placeholder="0"
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber ?? null)
                      }
                    />
                    <span className="text-sm text-muted-foreground">мм</span>
                  </div>
                </div>
              )}
            />
          </div>
        </section>

        <Separator />

        {/* Характеристики изоляционного материала */}
        <section className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Характеристики изоляционного материала
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Основной
              </h4>
              <div className="grid gap-4 sm:grid-cols-3 mt-2">
                <Controller
                  name="inputs.material.main.lambda"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>
                        Коэффициент теплопроводности
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber ?? null)
                          }
                          placeholder="0"
                        />
                        <span className="text-sm text-muted-foreground">
                          Вт/(м·К)
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Коэффициент теплопроводности материала.
                      </p>
                    </div>
                  )}
                />

                {isCompactionOn ? (
                  <Controller
                    name="inputs.material.main.compaction_factor"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>
                          Коэффициент уплотнения
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={field.value ?? ""}
                            type="number"
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber ?? null)
                            }
                            placeholder="0"
                          />
                          <span className="text-sm text-muted-foreground">
                            -
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Коэффициент уплотнения материала.
                        </p>
                      </div>
                    )}
                  />
                ) : null}

                {isMultiLayer ? (
                  <Controller
                    name="inputs.material.main.t_max"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>
                          Максимальная температура применения
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber ?? null)
                            }
                            placeholder="0"
                          />
                          <span className="text-sm text-muted-foreground">
                            °C
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Максимальная температура применения.
                        </p>
                      </div>
                    )}
                  />
                ) : null}
              </div>
            </div>

            {isMultiLayer ? (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Дополнительный
                </h4>
                <div className="grid gap-4 sm:grid-cols-3 mt-2">
                  <Controller
                    name="inputs.material.additional.lambda"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>
                          Коэффициент теплопроводности
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber ?? null)
                            }
                            placeholder="0"
                          />
                          <span className="text-sm text-muted-foreground">
                            Вт/(м·К)
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Коэффициент теплопроводности материала.
                        </p>
                      </div>
                    )}
                  />

                  {isCompactionOn ? (
                    <Controller
                      name="inputs.material.additional.compaction_factor"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>
                            Коэффициент уплотнения
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input
                              value={field.value ?? ""}
                              type="number"
                              onChange={(e) =>
                                field.onChange(e.target.valueAsNumber ?? null)
                              }
                              placeholder="0"
                            />
                            <span className="text-sm text-muted-foreground">
                              -
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Коэффициент уплотнения материала.
                          </p>
                        </div>
                      )}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <Separator />

        {/* Температуры */}
        <section className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Тепловой режим
          </h3>

          <div className="grid gap-4 sm:grid-cols-3">
            <Controller
              name="inputs.t_supply"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Подача</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={field.value ?? ""}
                      placeholder="0"
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber ?? null)
                      }
                    />
                    <span className="text-sm text-muted-foreground">°C</span>
                  </div>
                </div>
              )}
            />

            <Controller
              name="inputs.t_return"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Обратка</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={field.value ?? ""}
                      placeholder="0"
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber ?? null)
                      }
                    />
                    <span className="text-sm text-muted-foreground">°C</span>
                  </div>
                </div>
              )}
            />

            <Controller
              name="inputs.t_ambient"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Наружная</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={field.value ?? ""}
                      placeholder="0"
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber ?? null)
                      }
                    />
                    <span className="text-sm text-muted-foreground">°C</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Средняя температура отопительного периода или температура в
                    помещении.
                  </p>
                </div>
              )}
            />
          </div>
        </section>

        <Separator />

        {/* Условия прокладки */}
        <section className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Условия прокладки. Влияет на термическое сопротивление Rₙ и
            нормируемую плотность теплового потока qₗ
          </h3>

          <Controller
            name="inputs.laying_condition"
            control={control}
            render={({ field }) => (
              <RadioGroup
                defaultValue={field.value}
                className="grid gap-3 sm:grid-cols-2"
                onValueChange={field.onChange}
              >
                {Object.values(LAYING_CONDITION).map((method) => (
                  <Label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/50">
                    <RadioGroupItem value={method} />
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">
                        {LAYING_CONDITION_LABEL[method]}
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            )}
          />
        </section>

        <Separator />

        {/* Число часов работы */}
        <section className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Число часов работы в году. Влияет на нормируемую плотность теплового
            потока qₗ
          </h3>

          <Controller
            name="inputs.working_hours"
            control={control}
            render={({ field }) => (
              <RadioGroup
                defaultValue={field.value}
                className="grid gap-3 sm:grid-cols-2"
                onValueChange={field.onChange}
              >
                {Object.values(WORKING_HOURS_PER_YEAR).map((hours) => (
                  <Label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/50">
                    <RadioGroupItem value={hours} />
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">
                        {WORKING_HOURS_PER_YEAR_LABEL[hours]}
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            )}
          />
        </section>

        <Separator />

        {/* Способ прокладки */}
        <section className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Способ прокладки. Влияет на коэффициент K
          </h3>

          <Controller
            name="inputs.laying_method"
            control={control}
            render={({ field }) => (
              <RadioGroup
                defaultValue={field.value}
                className="grid gap-3 sm:grid-cols-2"
                onValueChange={field.onChange}
              >
                {Object.values(LAYING_METHOD).map((method) => (
                  <Label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-muted/50">
                    <RadioGroupItem value={method} />
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">
                        {LAYING_METHOD_LABEL[method]}
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            )}
          />
        </section>
      </CardContent>
    </Card>
  );
};
