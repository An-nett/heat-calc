import type { PropsWithChildren } from "react";

export function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh bg-background">
      <main
        className="
          mx-auto
          w-full
          max-w-5xl
          px-4
          py-8
          sm:px-6
          sm:py-10
        "
      >
        <div className="space-y-6">{children}</div>
      </main>
    </div>
  );
}
