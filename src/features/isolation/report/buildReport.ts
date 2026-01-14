import { Document, Packer } from "docx";
import type { CalcFormValues } from "../model/form";
import { sourcesSection } from "./sections/sources";
import { inputDataSection } from "./sections/inputs";
import { calcDescriptionSection } from "./sections/calcDescription";
import { supplyCalculationSection } from "./sections/supplyCalculation";
import { returnPipeCalculationSection } from "./sections/returnCalculation";
import { compactionSection } from "./sections/compaction";
import { resultSection } from "./sections/result";

export const buildReport = async (_values: CalcFormValues) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          ...sourcesSection(),
          ...inputDataSection(),
          ...calcDescriptionSection(),
          ...supplyCalculationSection(),
          ...returnPipeCalculationSection(),
          ...compactionSection(),
          ...resultSection(),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  return blob;
};
