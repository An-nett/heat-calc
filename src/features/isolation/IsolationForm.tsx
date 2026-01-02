import { PageHeader } from "../../shared/PageHeader";
import { PageShell } from "../../shared/PageShell";
import { CalcModeBar } from "./cards/CalcModeBar";
import { DeltaCard } from "./cards/DeltaCard";
import { IsolationInputsCard } from "./cards/IsolationInputsCard";
import { LnBCard } from "./cards/LnBCard";
import { NormativesCard } from "./cards/NormativesCard";
import { ResultCard } from "./cards/ResultCard";
import { type CalcFormValues, defaultValues } from "./model/form";
import { FormProvider, useForm } from "react-hook-form";

export const IsolationForm = () => {
  const form = useForm<CalcFormValues>({
    defaultValues,
    mode: "onChange",
  });

  return (
    <FormProvider {...form}>
      <PageShell>
        <PageHeader />
        <CalcModeBar />
        <IsolationInputsCard />
        <NormativesCard />
        <LnBCard />
        <DeltaCard />
        <ResultCard />
      </PageShell>
    </FormProvider>
  );
};

export default IsolationForm;
