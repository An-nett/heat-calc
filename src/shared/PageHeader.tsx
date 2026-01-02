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

      <p className="text-sm text-muted-foreground">
        СП 41.103.2000 · СП 61.13330.2012
      </p>
    </header>
  );
}
