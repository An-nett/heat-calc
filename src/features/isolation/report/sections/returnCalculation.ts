import {
  Paragraph,
  TextRun,
  AlignmentType,
  UnderlineType,
  MathRoundBrackets,
  MathFraction,
  Math,
} from "docx";
import { REPORT_FONT, REPORT_SIZE } from "../formatting";
import { mr, sub, supSub } from "../mathHelpers";
import type { CalcFormValues } from "../../model/form";
import type { DerivedValues } from "../../model/calculateDerivedValues";

const tr = (
  text: string,
  opts?: { sub?: boolean; sup?: boolean; bold?: boolean; italic?: boolean }
) =>
  new TextRun({
    text,
    font: REPORT_FONT,
    size: REPORT_SIZE,
    subScript: opts?.sub,
    superScript: opts?.sup,
    bold: opts?.bold,
    italics: opts?.italic,
  });

export const returnPipeCalculationSection = (
  values: CalcFormValues,
  returnValues: DerivedValues
) => {
  const tAvg = returnValues.tAvgResult?.tAvg?.toFixed(0) || "-";
  const ql = returnValues.ql?.result.exact.toFixed(1).replace(".", ",") || "-";
  const lambda =
    values.inputs.material.main.lambda?.toFixed(3).replace(".", ",") || "-";
  const K = returnValues.k?.toString().replace(".", ",") || "-";
  const tAmb = values.inputs.t_ambient?.toString().replace(".", ",") || "-";
  const R = returnValues.rn?.result.exact.toFixed(1).replace(".", ",") || "-";
  const lnB = returnValues.lnB?.toFixed(3)?.replace(".", ",") || "-";
  const B = returnValues.B?.toFixed(3)?.replace(".", ",") || "-";
  const innDiam = values.inputs.pipe_inner_diameter?.toString() || "-";
  const outDiam = values.inputs.pipe_outer_diameter?.toString() || "-";
  const res = returnValues.delta?.toFixed(1)?.replace(".", ",") || "-";

  return [
    // Заголовок
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { before: 300, after: 250 },
      children: [
        new TextRun({
          text: `Обратный трубопровод отопления Т2 Ду${innDiam}`,
          font: REPORT_FONT,
          size: REPORT_SIZE,
          bold: true,
          underline: { type: UnderlineType.SINGLE },
        }),
      ],
    }),

    // ql
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 220 },
      children: [
        tr("Нормативная плотность "),
        tr("q"),
        tr("l", { sub: true }),
        tr(" теплового потока для обратного трубопровода Т2 составит: "),
        tr("q"),
        tr("l", { sub: true }),
        tr(` = ${ql} Вт/м [3].`),
      ],
    }),

    // lnB подстановка (по центру)
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 250, after: 250 },
      children: [
        new Math({
          children: [
            mr(`ln B = 2 * 3,14 * ${lambda} * `),
            new MathRoundBrackets({
              children: [
                new MathFraction({
                  numerator: [mr(`${K} * (${tAvg} - ${tAmb})`)],
                  denominator: [mr(ql)],
                }),
                mr(` − ${R} = ${lnB}`),
              ],
            }),
          ],
        }),
      ],
    }),

    // B
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 200 },
      children: [
        tr("По таблице натуральных логарифмов определяем величину "),
        tr("B", { italic: true }),
        tr(` = ${B}.`),
      ],
    }),

    // Текст перед формулой δ
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 150 },
      children: [tr("Требуемая толщина изоляции определяется по формуле:")],
    }),

    // Формула δ
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 300, after: 300 },
      children: [
        new Math({
          children: [
            // δ_из =
            sub("δ", "из"),
            mr(" = "),

            // дробь
            new MathFraction({
              numerator: [
                // d_ст^н
                supSub("d", "ст", "н"),
                mr("* (B − 1)"),
              ],
              denominator: [mr("2")],
            }),
          ],
        }),
      ],
    }),

    // Пояснение переменных
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 150 },
      children: [
        tr("где "),
        tr("δ"),
        tr("из", { sub: true }),
        tr(" – требуемая толщина изоляции, мм;"),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 220 },
      children: [
        tr("d"),
        tr("ст", { sub: true }),
        tr(" – наружный диаметр трубопровода, мм."),
      ],
    }),

    // Подстановка и результат δ
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 300, after: 300 },
      children: [
        new Math({
          children: [
            // δ_из =
            sub("δ", "из"),
            mr(" = "),

            // дробь
            new MathFraction({
              numerator: [
                // d_ст^н
                mr(`${outDiam} * (${B} - 1)`),
              ],
              denominator: [mr("2")],
            }),
            mr(` = ${res} мм`),
          ],
        }),
      ],
    }),
  ];
};
