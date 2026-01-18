import { Paragraph, TextRun, AlignmentType, UnderlineType } from "docx";
import { REPORT_FONT, REPORT_SIZE } from "../formatting";
import type { CalcFormValues } from "../../model/form";
import type { DerivedValues } from "../../model/calculateDerivedValues";
import {
  LAYING_CONDITION,
  LAYING_METHOD,
  type LayingCondition,
  type LayingMethod,
} from "../../model/calcModes";

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

const getLayingParams = (
  laying_condition: LayingCondition,
  laying_method: LayingMethod
) => {
  if (laying_condition === LAYING_CONDITION.OUTDOOR) {
    return { text: "воздуха на улице", point: "а", type: "открытая" };
  } else if (laying_method === LAYING_METHOD.TRENCHLESS) {
    return { text: "грунта", point: "в", type: "открытая в помещении" };
  } else {
    return { text: "воздуха в помещении ", point: "б", type: "бесканальная" };
  }
};

export const inputDataSection = (
  values: CalcFormValues,
  supplyValues: DerivedValues,
  returnValues: DerivedValues
) => {
  const layingParams = getLayingParams(
    values.inputs.laying_condition,
    values.inputs.laying_method
  );

  const {
    outer_diameter: supply_outer_diameter,
    wall_thickness: supply_wall_thickness,
    inner_diameter: supply_inner_diameter,
  } = values.inputs.pipe.supply;
  const {
    outer_diameter: return_outer_diameter,
    wall_thickness: return_wall_thickness,
    inner_diameter: return_inner_diameter,
  } = values.inputs.pipe.return;

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

    //    - подача...
    p(
      ` -подача ф ${supply_outer_diameter
        ?.toString()
        ?.replace(".", ",")}х${supply_wall_thickness
        ?.toString()
        ?.replace(".", ",")} (Ду${supply_inner_diameter
        ?.toString()
        ?.replace(".", ",")}),`,
      { indentLeft: 720 }
    ),

    //    - обратка...
    p(
      ` -обратка ф ${return_outer_diameter
        ?.toString()
        ?.replace(".", ",")}х${return_wall_thickness
        ?.toString()
        ?.replace(".", ",")} (Ду${return_inner_diameter
        ?.toString()
        ?.replace(".", ",")}),`,
      { indentLeft: 720 }
    ),

    // 2. Тип прокладки...
    p(`2. Тип прокладки ${layingParams.type};`, { indentLeft: 360 }),

    // 3. Температурный график...
    p(
      `3. Температурный график: ${values.inputs.t_supply
        ?.toString()
        ?.replace(".", ",")}/${values.inputs.t_return
        ?.toString()
        ?.replace(".", ",")};`,
      { indentLeft: 360 }
    ),

    // 4. Температура ... принята 20°C (согласно требованиям источника [3] п 6.1.5 (а/б/в));
    p(
      `4. Температура ${layingParams.text} принята ${values.inputs.t_ambient}°C (согласно требованиям источника [3] п 6.1.5 (${layingParams.point})`,
      { indentLeft: 360 }
    ),

    // 5. Коэффициент теплопроводности...
    p(
      `5. Коэффициент теплопроводности принят в соответствии с техническими характеристиками 
      применяемого изоляционного материала (______________) ${values.inputs.material.main.lambda
        ?.toFixed(3)
        ?.replace(".", ",")} Вт/м²*°С`,
      { indentLeft: 360 }
    ),

    // 6. Средняя температура теплоносителя...
    p(
      `6. Средняя температура теплоносителя принимается в соответствии с табл. В.5 источника [3] и составляет ${supplyValues.tAvgResult?.tAvg?.toFixed(
        0
      )}°C для подающего трубопровода, ${returnValues.tAvgResult?.tAvg?.toFixed(
        0
      )}°C для обратного трубопровода.`,
      { indentLeft: 360, after: 300 }
    ),
  ];
};
