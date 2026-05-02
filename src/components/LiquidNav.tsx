import { useState, useRef, MouseEvent, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  Icon: typeof Home;
}

const items: NavItem[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "menu", label: "Menu", Icon: Menu },
  { id: "search", label: "Search", Icon: Search },
  { id: "likes", label: "Likes", Icon: Heart },
  { id: "profile", label: "Profile", Icon: User },
  { id: "theme", label: "Theme", Icon: Moon },
];

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const LiquidNav = () => {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);
  const [ripples, setRipples] = useState<Record<string, Ripple[]>>({});
  const rippleId = useRef(0);

  const handleClick = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: rippleId.current++, x, y };
    setRipples((p) => ({ ...p, [id]: [...(p[id] || []), newRipple] }));
    setActive(id);
    setTimeout(() => {
      setRipples((p) => ({
        ...p,
        [id]: (p[id] || []).filter((r) => r.id !== newRipple.id),
      }));
    }, 700);
  };

  const activeIndex = items.findIndex((i) => i.id === active);

  return (
    <nav
      aria-label="Primary"
      className="liquid-glass relative flex flex-col items-center gap-2 rounded-[36px] p-3"
    >
      {/* Floating liquid blob that follows the active item */}
      <div
        className="pointer-events-none absolute left-1/2 h-12 w-12 -translate-x-1/2 transition-all duration-500"
        style={{ top: `calc(0.75rem + ${activeIndex} * (3rem + 0.5rem))` }}
      >
        <div
          className="h-full w-full liquid-bubble"
          style={{ animation: "liquid-morph 6s ease-in-out infinite" }}
        />
      </div>

      {items.map(({ id, label, Icon }) => {
        const isActive = active === id;
        const isHovered = hovered === id;
        return (
          <button
            key={id}
            type="button"
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            onClick={(e) => handleClick(e, id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "group relative z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full",
              "transition-all duration-300 ease-out",
              "hover:scale-110 active:scale-95",
              isActive && "scale-110",
            )}
          >
            {/* Hover glass shimmer */}
            <span
              className={cn(
                "absolute inset-0 rounded-full transition-all duration-300",
                isHovered && !isActive
                  ? "bg-gradient-to-br from-white/50 to-white/10 opacity-100 backdrop-blur-md"
                  : "opacity-0",
              )}
            />

            {/* Ripples */}
            {(ripples[id] || []).map((r) => (
              <span
                key={r.id}
                className="pointer-events-none absolute h-12 w-12 rounded-full bg-white/60"
                style={{
                  left: r.x - 24,
                  top: r.y - 24,
                  animation: "ripple-out 0.7s ease-out forwards",
                }}
              />
            ))}

            <Icon
              className={cn(
                "relative h-5 w-5 transition-all duration-300",
                isActive
                  ? "text-foreground nav-icon-glow scale-110"
                  : "text-muted-foreground group-hover:text-foreground",
              )}
              strokeWidth={isActive ? 2.4 : 1.8}
            />

            {/* Tooltip */}
            <span
              className={cn(
                "pointer-events-none absolute left-full ml-4 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium",
                "liquid-glass text-foreground",
                "transition-all duration-200",
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2",
              )}
              style={isHovered ? { animation: "float-up 0.3s ease-out" } : undefined}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
