import { Document, Packer } from "docx";
import type { CalcFormValues } from "../model/form";
import { sourcesSection } from "./sections/sources";
import { inputDataSection } from "./sections/inputs";
import { calcDescriptionSection } from "./sections/calcDescription";
import { supplyCalculationSection } from "./sections/supplyCalculation";
import { returnPipeCalculationSection } from "./sections/returnCalculation";
import { compactionSection } from "./sections/compaction";
import { resultSection } from "./sections/result";
import { calculateDerivedValues } from "../model/calculateDerivedValues";
import { FLOW_MODE, SYSTEM_MODE } from "../model/calcModes";

export const buildReport = async (values: CalcFormValues) => {
  const isDualMode = values.mode.system_mode === SYSTEM_MODE.DUAL;

  const supplyResults = calculateDerivedValues({
    ...values,
    mode: { ...values.mode, flow: FLOW_MODE.SUPPLY },
  });
  const returnResults = calculateDerivedValues({
    ...values,
    mode: { ...values.mode, flow: FLOW_MODE.RETURN },
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          ...sourcesSection(),
          ...inputDataSection(values, supplyResults, returnResults),
          ...calcDescriptionSection(),
          ...supplyCalculationSection(values, supplyResults),
          ...(isDualMode
            ? returnPipeCalculationSection(values, returnResults)
            : []),
          ...(values.mode.compaction
            ? compactionSection(values, supplyResults, returnResults)
            : []),
          ...resultSection(values, supplyResults, returnResults),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  return blob;
};
