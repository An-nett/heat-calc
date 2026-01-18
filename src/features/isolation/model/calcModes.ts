/* -------------------- Режим теплоносителя -------------------- */

export const FLOW_MODE = {
  SUPPLY: "supply",
  RETURN: "return",
} as const;

export type FlowMode = (typeof FLOW_MODE)[keyof typeof FLOW_MODE];

export const FLOW_MODE_LABEL: Record<FlowMode, string> = {
  supply: "Подача",
  return: "Обратка",
};

/* -------------------- Тип системы -------------------- */

export const SYSTEM_MODE = {
  DUAL: "dual",
  SINGLE: "single",
} as const;

export type SystemMode = (typeof SYSTEM_MODE)[keyof typeof SYSTEM_MODE];

export const SYSTEM_MODE_LABEL: Record<SystemMode, string> = {
  dual: "Подача + обратка",
  single: "Только подача",
};

/* -------------------- Тип изоляции -------------------- */

export const ISOLATION_MODE = {
  SINGLE: "single",
  MULTI: "multi",
} as const;

export type IsolationMode =
  (typeof ISOLATION_MODE)[keyof typeof ISOLATION_MODE];

export const ISOLATION_MODE_LABEL: Record<IsolationMode, string> = {
  single: "Однослойная",
  multi: "Многослойная",
};

/* -------------------- Значения по умолчанию -------------------- */

export const DEFAULT_CALC_MODE = {
  flow: FLOW_MODE.SUPPLY,
  isolation: ISOLATION_MODE.SINGLE,
  compaction: false,
  system_mode: SYSTEM_MODE.DUAL,
} as const;

/* -------------------- Условия прокладки -------------------- */

export const LAYING_CONDITION = {
  INDOOR_HIGH_EMITTING: "indoor_high_emitting",
  OUTDOOR: "outdoor",
  INDOOR_LOW_EMITTING: "indoor_low_emitting",
} as const;

export type LayingCondition =
  (typeof LAYING_CONDITION)[keyof typeof LAYING_CONDITION];

export const LAYING_CONDITION_LABEL: Record<LayingCondition, string> = {
  indoor_high_emitting:
    "В помещении для поверхностей с высоким коэффициентом излучения",
  outdoor: "На открытом воздухе",
  indoor_low_emitting:
    "В помещении для поверхностей с малым коэффициентом излучения",
};

/* -------------------- Способ прокладки -------------------- */

export const LAYING_METHOD = {
  STEEL_MOVABLE: "steel_movable",
  STEEL_SUSPENDED: "steel_suspended",
  NONMETAL_MOVABLE: "nonmetal",
  TRENCHLESS: "trenchless",
} as const;

export type LayingMethod = (typeof LAYING_METHOD)[keyof typeof LAYING_METHOD];

export const LAYING_METHOD_LABEL: Record<LayingMethod, string> = {
  steel_movable: "Стальные трубопроводы на подвижных опорах",
  steel_suspended: "Стальные трубопроводы на подвесных опорах",
  nonmetal: "Неметаллические трубопроводы на подвижных и подвесных опорах",
  trenchless: "Бесканальная прокладка",
};

/* -------------------- Число часов работы -------------------- */

export const WORKING_HOURS_PER_YEAR = {
  MORE_THAN_5000: "more_than_5000",
  LESS_OR_EQUAL_5000: "less_or_equal_5000",
} as const;

export type WorkingHoursPerYear =
  (typeof WORKING_HOURS_PER_YEAR)[keyof typeof WORKING_HOURS_PER_YEAR];

export const WORKING_HOURS_PER_YEAR_LABEL: Record<WorkingHoursPerYear, string> =
  {
    more_than_5000: "Более 5000 часов",
    less_or_equal_5000: "Менее или равно 5000 часов",
  };
