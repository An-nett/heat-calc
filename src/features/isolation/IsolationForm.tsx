import { PageHeader } from "../../shared/PageHeader";
import { PageShell } from "../../shared/PageShell";
import { CalcModeBar } from "./cards/CalcModeBar";
import { DeltaCard } from "./cards/DeltaCard";
import { IsolationInputsCard } from "./cards/IsolationInputsCard";
import { LnBCard } from "./cards/LnBCard";
import { NormativesCard } from "./cards/NormativesCard";
import { ResultCard } from "./cards/ResultCard";

export const IsolationForm = () => {
  return (
    <PageShell>
      <PageHeader />
      <CalcModeBar />
      <IsolationInputsCard />
      <NormativesCard />
      <LnBCard />
      <DeltaCard />
      <ResultCard />
    </PageShell>
  );
};

export default IsolationForm;
