import { Paragraph, TextRun, AlignmentType, UnderlineType } from "docx";
import { REPORT_FONT, REPORT_SIZE } from "../formatting";
import type { CalcFormValues } from "../../model/form";
import type { DerivedValues } from "../../model/calculateDerivedValues";
import { SYSTEM_MODE } from "../../model/calcModes";

const tr = (
  text: string,
  opts?: { sub?: boolean; sup?: boolean; bold?: boolean }
) =>
  new TextRun({
    text,
    font: REPORT_FONT,
    size: REPORT_SIZE,
    subScript: opts?.sub,
    superScript: opts?.sup,
    bold: opts?.bold,
  });

export const compactionSection = (
  values: CalcFormValues,
  supplyValues: DerivedValues,
  returnValues: DerivedValues
) => {
  const isDualMode = values.mode.system_mode === SYSTEM_MODE.DUAL;

  const compFactor =
    values.inputs.material.main.compaction_factor
      ?.toString()
      ?.replace(".", ",") || "-";
  const supplyRes = supplyValues.delta?.toFixed(1)?.replace(".", ",") || "-";
  const supplyResWithCompaction =
    supplyValues.deltaWithCompaction?.toFixed(1)?.replace(".", ",") || "-";
  const returnRes = returnValues.delta?.toFixed(1)?.replace(".", ",") || "-";
  const returnResWithCompaction =
    returnValues.deltaWithCompaction?.toFixed(1)?.replace(".", ",") || "-";

  return [
    // Заголовок
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { before: 300, after: 250 },
      children: [
        new TextRun({
          text: "Толщина изоляции с учетом коэффициента уплотнения",
          font: REPORT_FONT,
          size: REPORT_SIZE,
          bold: true,
          underline: { type: UnderlineType.SINGLE },
        }),
      ],
    }),

    // Пояснение: Kс - ...
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 250 },
      children: [
        tr("К"),
        tr("с", { sub: true }),
        tr(" - коэффициент уплотнения теплоизоляционных изделий, "),
        tr("К"),
        tr("с", { sub: true }),
        tr(` = ${compFactor}.`),
      ],
    }),

    // δ1 = ...
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 200 },
      children: [
        tr("δ"),
        tr("1", { sub: true }),
        tr(` = ${supplyRes} * ${compFactor} = `),
        tr(`${supplyResWithCompaction} мм`, { bold: true }),
        tr(" (по Т1)"),
      ],
    }),

    // δ2 = ...
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: isDualMode ? 300 : 0 },
      children: isDualMode
        ? [
            tr("δ"),
            tr("2", { sub: true }),
            tr(` = ${returnRes} * ${compFactor} = `),
            tr(`${returnResWithCompaction} мм`, { bold: true }),
            tr(" (по Т2)"),
          ]
        : [],
    }),
  ];
};
