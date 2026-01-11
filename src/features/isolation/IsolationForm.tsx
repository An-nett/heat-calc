import { PageHeader } from "../../shared/PageHeader";
import { PageShell } from "../../shared/PageShell";
import { CalcModeBar } from "./cards/CalcModeBar";
import { DeltaCard } from "./cards/DeltaCard";
import { DeltaWithCompactionCard } from "./cards/DeltaWithCompactionCard";
import { IsolationInputsCard } from "./cards/IsolationInputsCard";
import { LnBCard } from "./cards/LnBCard";
import { NormativesCard } from "./cards/NormativesCard";
import { ResultCard } from "./cards/ResultCard";
import { StepsSection } from "./components/StepsSection";
import { type CalcFormValues, defaultValues } from "./model/form";
import { FormProvider, useForm } from "react-hook-form";

export const IsolationForm = () => {
  const form = useForm<CalcFormValues>({
    defaultValues,
    mode: "onChange",
  });

  const isCompaction = form.watch("mode.compaction");

  return (
    <FormProvider {...form}>
      <PageShell>
        <PageHeader />
        <CalcModeBar />
        <IsolationInputsCard />
        <StepsSection>
          <NormativesCard />
          <LnBCard />
          <DeltaCard />
          {isCompaction && <DeltaWithCompactionCard />}
        </StepsSection>
        <ResultCard />
      </PageShell>
    </FormProvider>
  );
};

export default IsolationForm;
