import { useFormContext, useWatch } from "react-hook-form";
import { calculateDerivedValues } from "../calculateDerivedValues";
import { type CalcFormValues } from "../form";
import { useMemo } from "react";

export const useDerivedValues = () => {
  const { control } = useFormContext<CalcFormValues>();

  const values = useWatch({ control }) as CalcFormValues;

  return useMemo(() => calculateDerivedValues(values), [values]);
};
