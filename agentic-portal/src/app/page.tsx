import { DailyBlueprint } from "@/components/daily-blueprint";
import { generateBlueprint } from "@/lib/generator";

export default function Home() {
  const blueprint = generateBlueprint();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(27,27,45,0.8),_#05050b)] pb-16 pt-24 text-[#d5d6df]">
      <div className="mx-auto w-full max-w-6xl px-6">
        <DailyBlueprint initialBlueprint={blueprint} />
      </div>
    </main>
  );
}
