'use client';

import { useMemo, useState, useTransition } from "react";
import { BrandAlchemyBlueprint, generateBlueprint } from "@/lib/generator";
import { Section } from "./section";
import clsx from "clsx";

type DailyBlueprintProps = {
  initialBlueprint: BrandAlchemyBlueprint;
};

const formatIndiaDate = (isoDate: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate));

export const DailyBlueprint = ({ initialBlueprint }: DailyBlueprintProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 10),
  );
  const [blueprint, setBlueprint] = useState(initialBlueprint);
  const [isPending, startTransition] = useTransition();

  const regenerate = (dateValue: string, seed?: string) => {
    startTransition(() => {
      const date = new Date(dateValue);
      if (Number.isNaN(date.getTime())) return;
      setBlueprint(generateBlueprint(date, { seed }));
    });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedDate(value);
    regenerate(value);
  };

  const handleShuffle = () => {
    const seed =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID().slice(0, 8)
        : Math.random().toString(36).slice(2, 10);
    regenerate(selectedDate, seed);
  };

  const heroStats = useMemo(
    () => [
      {
        label: "Niche Drop",
        value: blueprint.niche.name,
      },
      {
        label: "Archetype",
        value: blueprint.essence.archetype,
      },
      {
        label: "Palette",
        value: blueprint.visualSuite.palette,
      },
      {
        label: "Lighting",
        value: blueprint.visualSuite.lighting,
      },
    ],
    [blueprint],
  );

  return (
    <div className="flex flex-col gap-10">
      <section className="relative overflow-hidden rounded-3xl border border-[#2a2a33] bg-gradient-to-r from-black via-[#0b0b16] to-[#11111f] p-10 shadow-[0_0_80px_rgba(8,8,18,0.8)]">
        <div className="absolute -right-32 top-0 h-72 w-72 rounded-full bg-[#d4af37]/20 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[#8c6bff]/10 blur-3xl" />
        <div className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-5">
            <p className="font-mono text-xs uppercase tracking-[0.5em] text-[#d4af37]">
              Suruchi Synergia Global Manager AI
            </p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">
              Daily Brand Alchemy Blueprint
            </h1>
            <p className="max-w-2xl text-lg text-[#d5d6df]/90">
              Automating 360-degree content rituals for Maapreneurs & Womenpreneurs. Tap
              into today&apos;s niche, craft visuals dripping in gold noir, and
              distribute with fearless Hinglish storytelling.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-[#d5d6df]/80">
              <span className="rounded-full border border-[#d4af37]/40 bg-[#1a1a26]/80 px-4 py-1">
                {blueprint.essence.northStar}
              </span>
              <span className="rounded-full border border-[#4a4a5f] bg-[#0f0f1a]/70 px-4 py-1">
                {blueprint.essence.quote}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-[#2b2b3a] bg-black/40 p-5 text-sm text-[#d5d6df]">
            <label className="flex flex-col gap-2">
              <span className="font-semibold text-[#d4af37]">Date Sync</span>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="rounded-lg border border-[#3a3a4b] bg-[#0f0f19] px-3 py-2 text-base text-white outline-none transition focus:border-[#d4af37]"
              />
            </label>
            <button
              type="button"
              onClick={handleShuffle}
              className={clsx(
                "rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f1c876] px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60",
                isPending && "animate-pulse",
              )}
            >
              {isPending ? "Synthesising..." : "Summon Variant"}
            </button>
            <p className="text-xs uppercase tracking-[0.3em] text-[#7f7f94]">
              {blueprint.dateCode}
            </p>
          </div>
        </div>
        <dl className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#2d2d3a] bg-[#0d0d18]/60 p-4 backdrop-blur-lg"
            >
              <dt className="text-xs uppercase tracking-[0.3em] text-[#77778b]">
                {stat.label}
              </dt>
              <dd className="mt-2 text-lg font-medium text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Section
        eyebrow="Step 01"
        title="Soul Research Pulse"
        headingAccent={
          <span className="rounded-full border border-[#d4af37]/50 bg-[#151520] px-3 py-1 text-xs text-[#d4af37]">
            {formatIndiaDate(selectedDate)}
          </span>
        }
      >
        <p className="text-lg text-white">
          {blueprint.niche.snapshot}
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#2d2d3a] bg-[#10101b]/70 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              Pain Points
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[#d5d6df]/90">
              {blueprint.researchHighlights.painPoints.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#2d2d3a] bg-[#10101b]/70 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              Proof Signals
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[#d5d6df]/90">
              {blueprint.researchHighlights.proof.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#2d2d3a] bg-[#10101b]/70 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              Opportunity Plays
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[#d5d6df]/90">
              {blueprint.researchHighlights.opportunity.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Step 02" title="8K Visual Creation Lab">
        <p>
          Mood: <span className="text-white">{blueprint.niche.brandVoice}</span>
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#2d2d3a] bg-[#0f0f1a]/60 p-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[#d4af37]">
              Palette
            </h3>
            <p className="mt-2 text-sm text-[#d5d6df]/90">{blueprint.visualSuite.palette}</p>
          </div>
          <div className="rounded-2xl border border-[#2d2d3a] bg-[#0f0f1a]/60 p-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[#d4af37]">
              Lighting
            </h3>
            <p className="mt-2 text-sm text-[#d5d6df]/90">{blueprint.visualSuite.lighting}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {blueprint.visualSuite.moodBoard.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#2d2d3a] bg-[#151522]/80 px-3 py-1 text-xs text-[#d5d6df]"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {blueprint.visualSuite.assets.map((asset) => (
            <div
              key={asset.platform}
              className="rounded-2xl border border-[#2d2d3a] bg-[#0d0d18]/60 p-5 shadow-[0_0_30px_rgba(10,10,20,0.45)]"
            >
              <header className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-white">
                  {asset.platform}
                </h3>
                <span className="rounded-full border border-[#d4af37]/40 bg-[#1b1b25]/70 px-3 py-1 text-xs text-[#d4af37]">
                  {asset.format}
                </span>
              </header>
              <p className="text-sm italic text-[#d5d6df]/90">Hook: {asset.hook}</p>
              <p className="mt-3 whitespace-pre-line text-sm text-[#d5d6df]/80">
                {asset.prompt}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Step 03" title="Multi-Platform Copy Suite">
        <p className="text-lg font-semibold text-white">{blueprint.copySuite.hook}</p>
        <div className="rounded-2xl border border-[#2d2d3a] bg-[#10101b]/70 p-5">
          <h3 className="text-sm uppercase tracking-[0.3em] text-[#d4af37]">
            Brand Roadmap
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-[#d5d6df]/90">
            {blueprint.copySuite.brandRoadmap.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-[#2d2d3a] bg-[#0f0f1a]/60 p-4">
              <h4 className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">AI Strategy Tip</h4>
              <p className="mt-2 text-sm text-[#d5d6df]/90">
                {blueprint.copySuite.aiStrategy}
              </p>
            </div>
            <div className="rounded-xl border border-[#2d2d3a] bg-[#0f0f1a]/60 p-4">
              <h4 className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">CTA</h4>
              <p className="mt-2 text-sm text-[#d5d6df]/90">{blueprint.copySuite.cta}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {blueprint.copySuite.assets.map((asset) => (
            <article
              key={asset.platform}
              className="rounded-2xl border border-[#2d2d3a] bg-[#0b0b16]/70 p-5"
            >
              <header className="mb-2 flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">{asset.platform}</h3>
                <span className="text-xs uppercase tracking-[0.3em] text-[#7f7f94]">
                  Risk-Guru Vibe
                </span>
              </header>
              <p className="text-sm font-semibold text-[#d4af37]">{asset.headline}</p>
              <p className="mt-2 text-sm text-[#d5d6df]/90">{asset.narrative}</p>
              <ul className="mt-3 space-y-2 text-sm text-[#d5d6df]/80">
                {asset.roadmap.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[#7f7f94]">
                AI Ritual
              </p>
              <p className="mt-1 text-sm text-[#d5d6df]/80">{asset.aiTip}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[#7f7f94]">
                CTA
              </p>
              <p className="mt-1 text-sm text-[#d5d6df]/80">{asset.cta}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Step 04" title="Email Alchemy Loop">
        <div className="grid gap-4 md:grid-cols-2">
          {blueprint.emailLab.map((email) => (
            <article
              key={email.codeName}
              className="rounded-2xl border border-[#2d2d3a] bg-[#0d0d18]/70 p-5"
            >
              <header className="mb-2 flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">{email.codeName}</h3>
                <span className="rounded-full border border-[#2d2d3a] bg-[#151522]/60 px-3 py-1 text-xs text-[#d4af37]">
                  {email.subject}
                </span>
              </header>
              <p className="text-xs uppercase tracking-[0.3em] text-[#7f7f94]">
                Preview
              </p>
              <p className="mt-1 text-sm text-[#d5d6df]/90">{email.preview}</p>
              <ul className="mt-3 space-y-2 text-sm text-[#d5d6df]/80">
                {email.body.map((line) => (
                  <li key={line}>- {line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Step 05" title="Omni-Channel Distribution Grid">
        <div className="grid gap-4 md:grid-cols-2">
          {blueprint.omnichannel.map((channel) => (
            <article
              key={channel.name}
              className="rounded-2xl border border-[#2d2d3a] bg-[#0f0f1a]/70 p-5"
            >
              <header className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">{channel.name}</h3>
                <span className="rounded-full border border-[#2d2d3a] bg-[#151522]/70 px-3 py-1 text-xs uppercase tracking-[0.3em] text-[#7f7f94]">
                  Ritual
                </span>
              </header>
              <ul className="space-y-2 text-sm text-[#d5d6df]/85">
                {channel.tactics.map((tactic) => (
                  <li key={tactic}>- {tactic}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="PDF Ecosystem" title="The PDF Alchemy Stack">
        <div className="grid gap-4 lg:grid-cols-3">
          {blueprint.pdfStack.map((pdf) => (
            <article
              key={pdf.title}
              className="rounded-2xl border border-[#2d2d3a] bg-[#0d0d18]/70 p-5"
            >
              <h3 className="text-lg font-semibold text-white">{pdf.title}</h3>
              <p className="mt-2 text-sm text-[#d4af37]">{pdf.focus}</p>
              <p className="mt-3 text-sm text-[#d5d6df]/90">{pdf.heroIdea}</p>
              <ul className="mt-4 space-y-2 text-sm text-[#d5d6df]/80">
                {pdf.keyPages.map((page) => (
                  <li key={page}>- {page}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="text-right text-sm text-[#d5d6df]/60">
          Crafted with LOVE x TRIDENT x SPARK for fierce Maapreneur resilience.
        </p>
      </Section>
    </div>
  );
};
