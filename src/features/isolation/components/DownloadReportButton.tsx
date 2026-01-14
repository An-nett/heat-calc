import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { buildReport } from "../report/buildReport";
import { useFormContext, useWatch } from "react-hook-form";
import type { CalcFormValues } from "../model/form";

export const DownloadReportButton = () => {
  const { control } = useFormContext<CalcFormValues>();
  const { inputs } = useWatch({ control });

  const downloadReport = async () => {
    const blob = await buildReport(inputs as CalcFormValues);

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Расчет_теплоизоляции.docx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button className="gap-2" onClick={downloadReport}>
      <Download className="h-4 w-4" />
      Скачать отчёт
    </Button>
  );
};
