import { Paragraph, TextRun, AlignmentType, UnderlineType } from "docx";
import { REPORT_FONT, REPORT_SIZE } from "../formatting";

export const sourcesSection = () => {
  return [
    // Заголовок
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: "Расчет выполнен на основании следующих документов:",
          bold: true,
          underline: { type: UnderlineType.SINGLE },
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
      ],
    }),

    // 1
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 200 },
      indent: { left: 360 },
      children: [
        new TextRun({
          text: "1. Договор подряда № __ от ______;",
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
      ],
    }),

    // 2
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 200 },
      indent: { left: 360 },
      children: [
        new TextRun({
          text: "2. Акт обследования от ____ № ____;",
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
      ],
    }),

    // 3 (длинный пункт)
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 200 },
      indent: { left: 360 },
      children: [
        new TextRun({
          text:
            "3. СП 61.13330.2012 «Тепловая изоляция оборудования и трубопроводов». " +
            "Актуализированная редакция СНиП 41-03-2003 (с Изменением № 1);",
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
      ],
    }),

    // 4
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 300 },
      indent: { left: 360 },
      children: [
        new TextRun({
          text:
            "4. СП 131.13330.2020 «Строительная климатология». " +
            "Актуализированная редакция СНиП 23-01-99*.",
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
      ],
    }),
  ];
};
