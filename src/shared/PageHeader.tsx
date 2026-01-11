import { SNIP_61_LINK } from "@/features/isolation/constants/links";

export function PageHeader() {
  return (
    <header className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">
          Расчёт тепловой изоляции трубопровода
        </h1>

        <p className="text-base text-muted-foreground">
          по нормируемой плотности теплового потока
        </p>
      </div>

      <a
        href={SNIP_61_LINK}
        className="text-sm text-muted-foreground underline decoration-dotted hover:text-foreground"
        target="_blank"
        rel="noreferrer"
      >
        СП 61.13330.2012
      </a>
    </header>
  );
}
