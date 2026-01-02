import {
  DEFAULT_CALC_MODE,
  LAYING_CONDITION,
  LAYING_METHOD,
  type FlowMode,
  type IsolationMode,
  type LayingCondition,
  type LayingMethod,
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
    pipe_diameter: number | null; // Наружный диаметр трубы, мм
    laying_condition: LayingCondition; // Условие прокладки
    laying_method: LayingMethod; // Способ прокладки
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
    pipe_diameter: null,
    laying_condition: LAYING_CONDITION.OUTDOOR,
    laying_method: LAYING_METHOD.STEEL_MOVABLE,
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
