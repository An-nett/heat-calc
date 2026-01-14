import {
  Paragraph,
  TextRun,
  AlignmentType,
  UnderlineType,
  PageBreak,
} from "docx";
import { REPORT_FONT, REPORT_SIZE } from "../formatting";

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

export const resultSection = () => {
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
        tr("48 мм", { bold: true }),
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
        tr("43 мм", { bold: true }),
        tr(" (по Т2)"),
      ],
    }),
  ];
};
