import { Paragraph, TextRun, AlignmentType, UnderlineType } from "docx";
import { REPORT_FONT, REPORT_SIZE } from "../formatting";

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

export const compactionSection = () => {
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
        tr(" = 1,05."),
      ],
    }),

    // δ1 = ...
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 200 },
      children: [
        tr("δ"),
        tr("1", { sub: true }),
        tr(" = 45,9 * 1,05 = "),
        tr("48 мм", { bold: true }),
        tr(" (по Т1)"),
      ],
    }),

    // δ2 = ...
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 300 },
      children: [
        tr("δ"),
        tr("2", { sub: true }),
        tr(" = 40,5 * 1,05 = "),
        tr("43 мм", { bold: true }),
        tr(" (по Т2)"),
      ],
    }),
  ];
};
