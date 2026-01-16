'use client';

import { ReactNode } from "react";
import clsx from "clsx";

type SectionProps = {
  title: string;
  eyebrow?: string;
  className?: string;
  headingAccent?: ReactNode;
  children: ReactNode;
};

export const Section = ({
  title,
  eyebrow,
  className,
  headingAccent,
  children,
}: SectionProps) => (
  <section
    className={clsx(
      "rounded-3xl border border-[#2a2a33] bg-gradient-to-br from-black/50 via-[#0a0a14]/80 to-black/70 p-8 shadow-[0_0_60px_rgba(8,8,15,0.6)] backdrop-blur-sm",
      className,
    )}
  >
    <header className="mb-6">
      {eyebrow && (
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#d4af37]">
          {eyebrow}
        </span>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
        {headingAccent}
      </div>
    </header>
    <div className="space-y-4 text-base leading-relaxed text-[#d5d6df]">
      {children}
    </div>
  </section>
);

