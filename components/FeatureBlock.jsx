// components/FeatureBlock.jsx
// All comments are in English per your preference.
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

/**
 * FeatureBlock
 * - Shows a feature text block with an icon inside a circle.
 * - On first hover, a lotus blossom animation reveals multiple petals around the circle and they persist.
 *
 * Props:
 *  - icon: ReactNode for the center icon
 *  - title: string
 *  - label: string
 *  - description: string
 *  - reverse: boolean (swap text/icon sides on desktop)
 *
 *  Lotus config (all optional, with sensible defaults):
 *  - petals: number of petals (default 12)
 *  - petalRadius: distance from center (default 96)
 *  - petalRx: ellipse rx (width) (default 11)
 *  - petalRy: ellipse ry (height) (default 26)
 *  - startAngle: where the first petal starts in degrees; -90 = top (default -90)
 *  - ringSize: diameter of the center circle in Tailwind size (default 40 -> w-40 h-40)
 */
export default function FeatureBlock({
  icon,
  title,
  label,
  description,
  reverse = false,

  // —— Lotus config (customizable) ——
  petals = 12,
  petalRadius = 96,
  petalRx = 11,
  petalRy = 26,
  startAngle = -90, // -90 = top
  ringSize = 40, // center circle size (w-{ringSize} h-{ringSize})
}) {
  const containerClass = reverse ? "md:flex-row-reverse" : "md:flex-row";

  // Persist once revealed
  const [petalsShown, setPetalsShown] = useState(false);

  // Precompute angles and per-petal delays
  const petalsData = useMemo(() => {
    const arr = [];
    for (let i = 0; i < petals; i++) {
      const deg = startAngle + (360 / petals) * i;
      const rad = (deg * Math.PI) / 180;
      // Center at (100,100), place each petal center along a circle of radius petalRadius
      const cx = 100 + petalRadius * Math.cos(rad);
      const cy = 100 + petalRadius * Math.sin(rad);
      // Rotate each petal to face the center: add 90deg because ellipse's long axis points up initially
      const rotate = `rotate(${deg + 90} ${cx} ${cy})`;
      // Nice stagger
      const delayMs = i * 60; // tweak for faster/slower blossom
      arr.push({ i, deg, cx, cy, rotate, delayMs });
    }
    return arr;
  }, [petals, petalRadius, startAngle]);

  // Map a numeric ring size to Tailwind classes (e.g., 40 => w-40 h-40)
  const ringClass = useMemo(() => `w-${ringSize} h-${ringSize}`, [ringSize]);

  return (
    <motion.div
      className={`flex flex-col ${containerClass} md:items-center md:justify-between gap-12`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Text Section */}
      <div className="flex-1">
        <p className="uppercase text-sm text-[#64e3a1] font-medium tracking-wide mb-3">
          {label}
        </p>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h3>
        <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
      </div>

      {/* Icon + Lotus Section */}
      <div className="flex-1 flex justify-center md:justify-end">
        <div
          className="relative group w-56 h-56 flex items-center justify-center"
          onMouseEnter={() => setPetalsShown(true)} // once triggered, petals persist
        >
          {/* Glowing animated background ring (kept small) */}
          <motion.div
            className={`absolute ${ringClass} rounded-full bg-gradient-to-br from-[#64e3a1] to-transparent opacity-25 blur-2xl z-0`}
            animate={{ opacity: petalsShown ? 0.5 : [0.25, 0.35, 0.25] }}
            transition={{ duration: 2, repeat: petalsShown ? 0 : Infinity, ease: "easeInOut" }}
          />

          {/* Lotus petals: explicit coordinates + per-petal rotation -> robust across SSR/hydration */}
          <svg
            viewBox="0 0 200 200"
            className="absolute w-[320px] h-[320px] overflow-visible pointer-events-none z-20"
          >
            <defs>
              <radialGradient id="lotusFill" cx="50%" cy="40%" r="70%">
                <stop offset="0%" stopColor="#64e3a1" stopOpacity="0.55" />
                <stop offset="70%" stopColor="#64e3a1" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#64e3a1" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="lotusStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#64e3a1" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#64e3a1" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {petalsData.map(({ i, cx, cy, rotate, delayMs }) => {
              const sharedStyle = petalsShown
                ? {
                    opacity: 0,
                    transformOrigin: `${cx}px ${cy}px`,
                    animation: `petalIn 420ms ease-out ${delayMs}ms forwards`,
                  }
                : { opacity: 0 };

              return (
                <g key={i} transform={rotate}>
                  {/* Soft glow behind each petal */}
                  <ellipse cx={cx} cy={cy} rx={petalRx + 1} ry={petalRy + 2} fill="url(#lotusFill)" style={sharedStyle} />
                  {/* Petal body with subtle stroke */}
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={petalRx}
                    ry={petalRy}
                    fill="url(#lotusFill)"
                    stroke="url(#lotusStroke)"
                    strokeWidth="0.6"
                    style={sharedStyle}
                  />
                </g>
              );
            })}
          </svg>

          {/* Center Icon Circle (below petals or above? Here: below petals visually, but still above background ring) */}
          <div
            className={`relative z-10 ${ringClass} rounded-full border border-[#64e3a1]/40 bg-[#64e3a1]/10 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-105 group-hover:shadow-[0_0_26px_#64e3a1] duration-300`}
          >
            {icon}
          </div>

          {/* Thin outline ring */}
          <motion.div
            className={`absolute ${ringClass} rounded-full border border-[#64e3a1]/30 z-0`}
            animate={{ scale: petalsShown ? 1.02 : [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: petalsShown ? 0 : Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Global keyframes for robust SVG animation (no framer-motion needed for petals) */}
      <style jsx global>{`
        @keyframes petalIn {
          0%   { opacity: 0; transform: scale(0.6) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </motion.div>
  );
}
