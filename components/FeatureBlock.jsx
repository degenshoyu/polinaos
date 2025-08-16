// components/FeatureBlock.jsx
// Lotus-style petals using cubic Bezier paths. Comments in English.
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function FeatureBlock({
  icon,
  title,
  label,
  description,
  reverse = false,

  // —— Lotus config (customizable) ——
  petals = 12,        // number of petals
  petalRadius = 96,   // distance from center to petal center
  petalWidth = 22,    // visual width of a petal (approx)
  petalLength = 64,   // visual length of a petal (approx)
  startAngle = -90,   // -90 = top
  // Petal shape tuning (0~1): higher = sharper tip, rounder base
  tipSharpness = 0.85,
  baseRoundness = 0.35,
}) {
  const containerClass = reverse ? "md:flex-row-reverse" : "md:flex-row";

  // Persist once revealed
  const [petalsShown, setPetalsShown] = useState(false);

  // Precompute petal placement & animation delays
  const petalsData = useMemo(() => {
    const arr = [];
    for (let i = 0; i < petals; i++) {
      const deg = startAngle + (360 / petals) * i;
      const rad = (deg * Math.PI) / 180;
      // Place each petal center on a circle (SVG coords center = (100,100))
      const cx = 100 + petalRadius * Math.cos(rad);
      const cy = 100 + petalRadius * Math.sin(rad);
      // We'll draw the petal around (0,0) pointing up, then transform to position+rotation
      const transform = `translate(${cx} ${cy}) rotate(${deg + 90})`;
      const delayMs = i * 60; // stagger
      arr.push({ i, cx, cy, transform, delayMs });
    }
    return arr;
  }, [petals, petalRadius, startAngle]);

  // Build a lotus-like petal path around (0,0), pointing up.
  // tip at (0, -L); base near (0, 0). Symmetric left/right.
  const buildPetalPath = (W, L, tipK = 0.85, baseK = 0.35) => {
    // Control points:
    const tipY = -L;
    const leftX = -W / 2;
    const rightX = W / 2;

    // How far the outer curve bulges sideways & how quickly it returns to base
    const cxOuter = W * 0.55;         // sideways bulge
    const cyOuter = L * (1 - tipK);   // how close to the tip the curve control is
    const cxInner = W * 0.35;         // inner curve towards base
    const cyInner = L * (1 - baseK);  // base roundness

    // Path (closed):
    // Move to tip, curve down right to base, then up left back to tip (forming a teardrop / lotus shape)
    return `
      M 0 ${-L}
      C ${rightX} ${tipY + cyOuter}, ${cxInner} ${-L + cyInner}, 0 0
      C ${-cxInner} ${-L + cyInner}, ${leftX} ${tipY + cyOuter}, 0 ${-L}
      Z
    `;
  };

  // Precompute petal paths once
  const petalPath = useMemo(
    () => buildPetalPath(petalWidth, petalLength, tipSharpness, baseRoundness),
    [petalWidth, petalLength, tipSharpness, baseRoundness]
  );

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
          className="relative group flex items-center justify-center"
          style={{ width: 224, height: 224 }} // w-56 h-56 equivalent
          onMouseEnter={() => setPetalsShown(true)} // reveal once, persist
        >
          {/* Glowing animated background ring (below petals) */}
          <motion.div
            className="absolute rounded-full bg-gradient-to-br from-[#64e3a1] to-transparent opacity-25 blur-2xl"
            style={{ width: 160, height: 160 }} // w-40 h-40
            animate={{ opacity: petalsShown ? 0.5 : [0.25, 0.35, 0.25] }}
            transition={{ duration: 2, repeat: petalsShown ? 0 : Infinity, ease: "easeInOut" }}
          />

          {/* Lotus petals (SVG). Explicit positions, robust across SSR/hydration. */}
          <svg
            viewBox="0 0 200 200"
            className="absolute pointer-events-none"
            style={{ width: 340, height: 340, overflow: "visible", zIndex: 20 }}
          >
            <defs>
              {/* Soft fill + highlight */}
              <radialGradient id="lotusFill" cx="50%" cy="40%" r="70%">
                <stop offset="0%" stopColor="#64e3a1" stopOpacity="0.55" />
                <stop offset="70%" stopColor="#64e3a1" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#64e3a1" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="lotusStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#64e3a1" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#64e3a1" stopOpacity="0.15" />
              </linearGradient>
              {/* Inner highlight gradient */}
              <linearGradient id="lotusInner" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {petalsData.map(({ i, transform, delayMs }) => {
              const animStyle = petalsShown
                ? {
                    opacity: 0,
                    transformOrigin: "0px 0px", // inside group after translate/rotate
                    animation: `petalIn 420ms ease-out ${delayMs}ms forwards`,
                  }
                : { opacity: 0 };

              return (
                <g key={i} transform={transform}>
                  {/* Back glow (slightly larger) */}
                  <path
                    d={petalPath}
                    fill="url(#lotusFill)"
                    style={animStyle}
                    transform="scale(1.06)"
                  />
                  {/* Main body */}
                  <path
                    d={petalPath}
                    fill="url(#lotusFill)"
                    stroke="url(#lotusStroke)"
                    strokeWidth="0.7"
                    style={animStyle}
                  />
                  {/* Inner highlight (gives lotus sheen) */}
                  <path
                    d={petalPath}
                    fill="url(#lotusInner)"
                    style={{ ...animStyle, transform: "scale(0.82) translateY(4px)" }}
                  />
                  {/* Midrib (vein) */}
                  <line
                    x1="0"
                    y1={-petalLength}
                    x2="0"
                    y2="0"
                    stroke="#ffffff"
                    strokeOpacity="0.18"
                    strokeWidth="0.8"
                    style={animStyle}
                  />
                </g>
              );
            })}
          </svg>

          {/* Center Icon Circle (above background ring, below petals visually for contrast) */}
          <div
            className="relative border border-[#64e3a1]/40 bg-[#64e3a1]/10 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_26px_#64e3a1]"
            style={{ width: 160, height: 160, borderRadius: 9999, zIndex: 10 }}
          >
            {icon}
          </div>

          {/* Thin outline ring */}
          <motion.div
            className="absolute border border-[#64e3a1]/30"
            style={{ width: 160, height: 160, borderRadius: 9999, zIndex: 0 }}
            animate={{ scale: petalsShown ? 1.02 : [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: petalsShown ? 0 : Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Global keyframes for robust SVG animation */}
      <style jsx global>{`
        @keyframes petalIn {
          0%   { opacity: 0; transform: scale(0.6) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </motion.div>
  );
}
