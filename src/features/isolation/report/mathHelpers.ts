import {
  MathRun,
  MathSubScript,
  MathSubSuperScript,
  MathSuperScript,
} from "docx";

export const mr = (t: string) => new MathRun(t);

export const sub = (base: string, idx: string) =>
  new MathSubScript({
    children: [mr(base)],
    subScript: [mr(idx)],
  });

export const sup = (base: string, idx: string) =>
  new MathSuperScript({
    children: [mr(base)],
    superScript: [mr(idx)],
  });

export const supSub = (base: string, sub: string, sup: string) =>
  new MathSubSuperScript({
    children: [mr(base)],
    superScript: [mr(sup)],
    subScript: [mr(sub)],
  });
