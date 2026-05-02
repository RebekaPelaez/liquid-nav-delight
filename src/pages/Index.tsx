import { LiquidNav } from "@/components/LiquidNav";

const Index = () => {
  return (
    <main className="dark relative min-h-screen overflow-hidden bg-background">
      {/* Soft ambient background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-32 top-20 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(35 80% 70%), transparent 70%)" }}
        />
        <div
          className="absolute right-10 top-1/2 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(200 60% 65%), transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(280 50% 70%), transparent 70%)" }}
        />
      </div>

      {/* Side nav */}
      <div className="fixed left-6 top-1/2 z-50 -translate-y-1/2">
        <LiquidNav />
      </div>

      {/* Content */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 inline-block rounded-full liquid-glass px-4 py-1.5 text-xs font-medium tracking-wide text-foreground">
          ✦ Liquid Glass Navigation
        </span>
        <h1 className="text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
          Hover. Click. <span className="italic text-muted-foreground">Flow.</span>
        </h1>
        <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">
          A playful glassmorphic nav with morphing liquid bubbles, ripple clicks,
          and floating tooltips. Try every icon on the left.
        </p>
      </section>
    </main>
  );
};

export default Index;
