import {
  Paragraph,
  TextRun,
  AlignmentType,
  UnderlineType,
  PageBreak,
} from "docx";
import { REPORT_FONT, REPORT_SIZE } from "../formatting";
import type { DerivedValues } from "../../model/calculateDerivedValues";
import type { CalcFormValues } from "../../model/form";

const tr = (
  text: string,
  opts?: { bold?: boolean; sub?: boolean; sup?: boolean }
) =>
  new TextRun({
    text,
    font: REPORT_FONT,
    size: REPORT_SIZE,
    bold: opts?.bold,
    subScript: opts?.sub,
    superScript: opts?.sup,
  });

export const resultSection = (
  values: CalcFormValues,
  supplyValues: DerivedValues,
  returnValues: DerivedValues
) => {
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
    // --- Новая страница ---
    new Paragraph({
      children: [new PageBreak()],
    }),

    // Заголовок "Выводы:"
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: "Выводы:",
          font: REPORT_FONT,
          size: REPORT_SIZE,
          bold: true,
          underline: { type: UnderlineType.SINGLE },
        }),
      ],
    }),

    // Основной текст
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 300 },
      children: [
        tr(
          "По результатам расчета для обеспечения нормативной плотности теплового потока " +
            "с поверхности изолированного трубопровода толщина данного теплоизоляционного " +
            "материала должна составлять:"
        ),
      ],
    }),

    // δ1
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 150 },
      children: [
        tr("δ"),
        tr("1", { sub: true }),
        tr(" = "),
        tr(`${compFactor ? supplyResWithCompaction : supplyRes} мм`, {
          bold: true,
        }),
        tr(" (по Т1)"),
      ],
    }),

    // δ2
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 300 },
      children: [
        tr("δ"),
        tr("2", { sub: true }),
        tr(" = "),
        tr(`${compFactor ? returnResWithCompaction : returnRes} мм`, {
          bold: true,
        }),
        tr(" (по Т2)"),
      ],
    }),
  ];
};
