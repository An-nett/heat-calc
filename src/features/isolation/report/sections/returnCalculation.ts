import { Paragraph, TextRun, AlignmentType, UnderlineType } from "docx";
import { REPORT_FONT, REPORT_SIZE } from "../formatting";

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

export const returnPipeCalculationSection = () => {
  return [
    // Заголовок
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { before: 300, after: 250 },
      children: [
        new TextRun({
          text: "Обратный трубопровод отопления Т2 Ду50",
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
        tr(" = 10 Вт/м [3]."),
      ],
    }),

    // lnB подстановка (по центру)
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 280 },
      children: [
        tr("lnB = 2 * 3,14 * 0,042 * ( "),
        tr("1,2 * (50 − 20)"),
        tr(" / 10 − 0,25"),
        tr(" ) = 0,884", { italic: true }),
      ],
    }),

    // B
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 200 },
      children: [
        tr("По таблице натуральных логарифмов определяем величину "),
        tr("B", { italic: true }),
        tr(" = 2,421."),
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
      spacing: { after: 200 },
      children: [
        tr("δ"),
        tr("из", { sub: true }),
        tr(" = "),
        tr("d"),
        tr("ст", { sub: true }),
        tr(" * ("),
        tr("B", { italic: true }),
        tr(" − 1) / 2"),
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
      spacing: { after: 300 },
      children: [
        tr("δ"),
        tr("из", { sub: true }),
        tr(" = 57 * (2,421 − 1) / 2 = 40,5 мм", { italic: true }),
      ],
    }),
  ];
};
