import { Paragraph, TextRun, AlignmentType, UnderlineType } from "docx";
import { REPORT_FONT, REPORT_SIZE } from "../formatting";

const just = (text: string, opts?: { after?: number; indentLeft?: number }) =>
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: opts?.after ?? 200 },
    indent: opts?.indentLeft != null ? { left: opts.indentLeft } : undefined,
    children: [new TextRun({ text, font: REPORT_FONT, size: REPORT_SIZE })],
  });

const titleUnderlined = (text: string) =>
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 300, after: 250 },
    children: [
      new TextRun({
        text,
        font: REPORT_FONT,
        size: REPORT_SIZE,
        bold: true,
        underline: { type: UnderlineType.SINGLE },
      }),
    ],
  });

export const calcDescriptionSection = () => {
  return [
    // Заголовок
    titleUnderlined(
      "Расчет толщины тепловой изоляции по нормированной плотности теплового потока"
    ),

    // Абзац с отступом первой строки (как в Word)
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 200 },
      indent: { firstLine: 720 }, // красная строка
      children: [
        new TextRun({
          text:
            "В соответствии с формулой 19 источника [3] для цилиндрической поверхности " +
            "диаметром менее 2 м предварительно рассчитывают:",
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
      ],
    }),

    // Формула (пока текстом, по центру)
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 250 },
      children: [
        new TextRun({
          text: "lnB = 2 * π * λ * ( K*(tв − tн) / ql − Rн )",
          font: REPORT_FONT,
          size: REPORT_SIZE,
          italics: true,
        }),
      ],
    }),

    // Где:
    just("Где:", { after: 150 }),

    // Список определений (как на скане — дефис и пояснение)
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 200 },
      indent: { left: 360 },
      children: [
        new TextRun({
          text: "λ – теплопроводность изоляционного материала, Вт/м",
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
        new TextRun({
          text: "2",
          superScript: true,
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
        new TextRun({ text: "*°С;", font: REPORT_FONT, size: REPORT_SIZE }),
      ],
    }),
    just(
      "K – коэффициент дополнительных потерь, принимаемый в зависимости от способа прокладки трубопровода по таблице В.1 [3];",
      { indentLeft: 360 }
    ),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 200 },
      indent: { left: 360 },
      children: [
        new TextRun({
          text: "t",
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
        new TextRun({
          text: "в",
          subScript: true,
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
        new TextRun({
          text: " – расчетная температура теплоносителя, °С согласно табл. 15 [3];",
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
      ],
    }),
    just(
      "Rн – линейное термическое сопротивление теплоотдаче наружной изоляции, м*°С/Вт. Принимается по табл. В.3 [3];",
      { indentLeft: 360 }
    ),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 200 },
      indent: { left: 360 },
      children: [
        new TextRun({
          text: "R",
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
        new TextRun({
          text: "н",
          subScript: true,
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
        new TextRun({
          text: " – линейное термическое сопротивление теплоотдаче наружной изоляции, м*°С/Вт. Принимается по табл. В.3 [3];",
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
      ],
    }),
    just(
      "ql – плотность теплового потока, Вт/м. Принимается по табл. 2 [3] в соответствии с расчетной температурой. Промежуточные величины определяются интерполяцией;",
      { indentLeft: 360, after: 300 }
    ),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 200 },
      indent: { left: 360 },
      children: [
        new TextRun({
          text: "q",
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
        new TextRun({
          text: "l",
          subScript: true,
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
        new TextRun({
          text: " – плотность теплового потока, Вт/м. Принимается по табл. 2 [3] в соответствии с расчетной температурой. Промежуточные величины определяются интерполяцией;",
          font: REPORT_FONT,
          size: REPORT_SIZE,
        }),
      ],
    }),
  ];
};
