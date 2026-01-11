import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      <CardHeader>
        <CardTitle className="text-lg">Исходные данные</CardTitle>
      </CardHeader>

      <CardContent>
        <Accordion
          type="multiple"
          defaultValue={[
            "geometry",
            "material",
            "thermal",
            "laying-condition",
            "working-hours",
            "laying-method",
          ]}
          className="w-full border rounded"
        >
          {/* Геометрия */}
          <AccordionItem value="geometry">
            <AccordionTrigger className="py-4 px-4 text-md bg-muted/60">
              Геометрия
            </AccordionTrigger>
            <AccordionContent className="py-6 px-4 border-t-1">
              <div className="grid gap-4 sm:grid-cols-3">
                <Controller
                  name="inputs.pipe_outer_diameter"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name} className="font-normal">
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
                        <span className="text-sm text-muted-foreground">
                          мм
                        </span>
                      </div>
                    </div>
                  )}
                />

                <Controller
                  name="inputs.pipe_inner_diameter"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name} className="font-normal">
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
                        <span className="text-sm text-muted-foreground">
                          мм
                        </span>
                      </div>
                    </div>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Характеристики изоляционного материала */}
          <AccordionItem value="material">
            <AccordionTrigger className="py-4 px-4 text-md bg-muted/60">
              Характеристики изоляционного материала
            </AccordionTrigger>
            <AccordionContent className="py-6 px-4 border-t-1">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-4">
                    Основной
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-3 mt-2">
                    <Controller
                      name="inputs.material.main.lambda"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label htmlFor={field.name} className="font-normal">
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
                            <Label htmlFor={field.name} className="font-normal">
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
                            <Label htmlFor={field.name} className="font-normal">
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
                    <h4 className="text-sm font-medium text-muted-foreground mb-4">
                      Дополнительный
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-3 mt-2">
                      <Controller
                        name="inputs.material.additional.lambda"
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-2">
                            <Label htmlFor={field.name} className="font-normal">
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
                              <Label
                                htmlFor={field.name}
                                className="font-normal"
                              >
                                Коэффициент уплотнения
                              </Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  value={field.value ?? ""}
                                  type="number"
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.valueAsNumber ?? null
                                    )
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
            </AccordionContent>
          </AccordionItem>

          {/* Температуры */}
          <AccordionItem value="thermal">
            <AccordionTrigger className="py-4 px-4 text-md bg-muted/60">
              Тепловой режим
            </AccordionTrigger>
            <AccordionContent className="py-6 px-4 border-t-1">
              <div className="grid gap-4 sm:grid-cols-3">
                <Controller
                  name="inputs.t_supply"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name} className="font-normal">
                        Подача
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
                        <span className="text-sm text-muted-foreground">
                          °C
                        </span>
                      </div>
                    </div>
                  )}
                />

                <Controller
                  name="inputs.t_return"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name} className="font-normal">
                        Обратка
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
                        <span className="text-sm text-muted-foreground">
                          °C
                        </span>
                      </div>
                    </div>
                  )}
                />

                <Controller
                  name="inputs.t_ambient"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name} className="font-normal">
                        Наружная
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
                        <span className="text-sm text-muted-foreground">
                          °C
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Средняя температура отопительного периода или
                        температура в помещении.
                      </p>
                    </div>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Условия прокладки */}
          <AccordionItem value="laying-condition">
            <AccordionTrigger className="py-4 px-4 text-md bg-muted/60">
              Условия прокладки
            </AccordionTrigger>
            <AccordionContent className="py-6 px-4 border-t-1">
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
                          <div className="text-sm font-medium font-normal">
                            {LAYING_CONDITION_LABEL[method]}
                          </div>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Число часов работы */}
          <AccordionItem value="working-hours">
            <AccordionTrigger className="py-4 px-4 text-md bg-muted/60">
              Число часов работы в году
            </AccordionTrigger>
            <AccordionContent className="py-6 px-4 border-t-1">
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
                          <div className="text-sm font-medium font-normal">
                            {WORKING_HOURS_PER_YEAR_LABEL[hours]}
                          </div>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Способ прокладки */}
          <AccordionItem value="laying-method">
            <AccordionTrigger className="py-4 px-4 text-md bg-muted/60">
              Способ прокладки
            </AccordionTrigger>
            <AccordionContent className="py-6 px-4 border-t-1">
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
                          <div className="text-sm font-medium font-normal">
                            {LAYING_METHOD_LABEL[method]}
                          </div>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
