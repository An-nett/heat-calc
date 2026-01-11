import {
  DEFAULT_CALC_MODE,
  LAYING_CONDITION,
  LAYING_METHOD,
  WORKING_HOURS_PER_YEAR,
  type FlowMode,
  type IsolationMode,
  type LayingCondition,
  type LayingMethod,
  type WorkingHoursPerYear,
} from "./calcModes";

export type LayersCoefficients = {
  lambda: number | null; // Теплопроводность, Вт/(м·К)
  compaction_factor: number | null; // Коэффициент уплотнения
};

export type CalcFormValues = {
  mode: {
    flow: FlowMode;
    isolation: IsolationMode;
    compaction: boolean;
  };
  inputs: {
    t_supply: number | null; // Температура подачи, °C
    t_return: number | null; // Температура обратки, °C
    t_ambient: number | null; // Температура окружающей среды, °C
    pipe_outer_diameter: number | null; // Наружный диаметр трубы, мм
    pipe_inner_diameter: number | null; // Внутренний диаметр трубы, мм
    laying_condition: LayingCondition; // Условие прокладки
    laying_method: LayingMethod; // Способ прокладки
    working_hours: WorkingHoursPerYear; // Рабочие часы в году
    material: {
      main: LayersCoefficients & { t_max: number | null }; // Основной слой
      additional: LayersCoefficients; // Дополнительный слой
    };
  };
};

export const defaultValues: CalcFormValues = {
  mode: { ...DEFAULT_CALC_MODE },
  inputs: {
    t_supply: null,
    t_return: null,
    t_ambient: null,
    pipe_outer_diameter: null,
    pipe_inner_diameter: null,
    laying_condition: LAYING_CONDITION.OUTDOOR,
    laying_method: LAYING_METHOD.STEEL_MOVABLE,
    working_hours: WORKING_HOURS_PER_YEAR.MORE_THAN_5000,
    material: {
      main: {
        lambda: null,
        compaction_factor: null,
        t_max: null,
      },
      additional: {
        lambda: null,
        compaction_factor: null,
      },
    },
  },
};
