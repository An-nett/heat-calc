export const Fraction = ({
  top,
  bottom,
}: {
  top: React.ReactNode;
  bottom: React.ReactNode;
}) => (
  <span className="inline-flex flex-col items-center leading-tight">
    <span className="border-b border-foreground px-1">{top}</span>
    <span className="px-1">{bottom}</span>
  </span>
);

export const Sub = ({ children }: { children: React.ReactNode }) => (
  <sub className="text-[0.7em] align-sub">{children}</sub>
);

export const Sup = ({ children }: { children: React.ReactNode }) => (
  <sup className="text-[1em]">{children}</sup>
);

export const FormulaLine = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[15px] leading-relaxed text-foreground">{children}</div>
);
