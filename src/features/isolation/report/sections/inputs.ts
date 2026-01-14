import { Paragraph, TextRun, AlignmentType, UnderlineType } from "docx";
import { REPORT_FONT, REPORT_SIZE } from "../formatting";

const p = (
  text: string,
  opts?: { indentLeft?: number; hanging?: number; after?: number }
) =>
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: opts?.after ?? 200 },
    indent:
      opts?.indentLeft != null
        ? { left: opts.indentLeft, hanging: opts?.hanging }
        : undefined,
    children: [
      new TextRun({
        text,
        font: REPORT_FONT,
        size: REPORT_SIZE,
      }),
    ],
  });

export const inputDataSection = () => {
  return [
    // Заголовок
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { before: 300, after: 250 },
      children: [
        new TextRun({
          text: "Исходные данные:",
          bold: true,
          underline: { type: UnderlineType.SINGLE },
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
      ],
    }),

    // 1. Диаметр трубопроводов:
    p("1. Диаметр трубопроводов:", { indentLeft: 360 }),

    //    - отопление...
    p(" -отопление Т1, Т2 ф 57х3,5 (Ду50),", { indentLeft: 720 }),

    // 2. Тип прокладки...
    p("2. Тип прокладки открытая по помещению подвала;", { indentLeft: 360 }),

    // 3. Температурный график...
    p("3. Температурный график: 95/70;", { indentLeft: 360 }),

    // 4. Температура ... принята 20°C (согласно требованиям источника [3] п 6.1.5 (а/б/в));
    p(
      "4. Температура (воздуха на улице/воздуха в помещении подвала/грунта) принята 20°C " +
        "(согласно требованиям источника [3] п 6.1.5 (а/б/в));",
      { indentLeft: 360 }
    ),

    // 5. Коэффициент теплопроводности...
    p(
      "5. Коэффициент теплопроводности принят в соответствии с техническими характеристиками " +
        "применяемого изоляционного материала (....................) 0,042 Вт/м²*°С",
      { indentLeft: 360 }
    ),

    // 6. Средняя температура теплоносителя...
    p(
      "6. Средняя температура теплоносителя принимается в соответствии с табл. В.5 источника [3] " +
        "и составляет 65°C для подающего трубопровода, 50°C для обратного трубопровода.",
      { indentLeft: 360, after: 300 }
    ),
  ];
};
