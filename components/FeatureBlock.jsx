// components/FeatureBlock.jsx
// Lotus with pink-white skin (petals + corona colors).
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function FeatureBlock({
  icon,
  title,
  label,
  description,
  reverse = false,
  outerPetals = 8,
  innerPetals = 8,
  outerRadius = 35,
  outerWidth = 35,
  outerLength = 55,
  innerRadius = 15,
  innerWidth = 30,
  innerLength = 40,
  startAngle = -90,
  tipSharpness = 0.6,
  baseRoundness = 0.2,
  baseInsetOuter = 0,
  baseInsetInner = 0,
  ringPx = 160
}) {
  const containerClass = reverse ? "md:flex-row-reverse" : "md:flex-row";
  const [blossomed, setBlossomed] = useState(false);

  // --- Build a lotus-like petal path ---
  const buildPetalPath = (W, L, tipK, baseK) => {
    const tipY = -L;
    const leftX = -W / 2;
    const rightX = W / 2;
    const cxOuter = W * 0.6;
    const cyOuter = L * (1 - tipK);
    const cxInner = W * 0.38;
    const cyInner = L * (1 - baseK);

    return `
      M 0 ${-L}
      C ${rightX} ${tipY + cyOuter}, ${cxInner} ${-L + cyInner}, 0 0
      C ${-cxInner} ${-L + cyInner}, ${leftX} ${tipY + cyOuter}, 0 ${-L}
      Z
    `;
  };

  const pathOuter = useMemo(
    () => buildPetalPath(outerWidth, outerLength, tipSharpness, baseRoundness),
    [outerWidth, outerLength, tipSharpness, baseRoundness]
  );
  const pathInner = useMemo(
    () => buildPetalPath(innerWidth, innerLength, tipSharpness, baseRoundness),
    [innerWidth, innerLength, tipSharpness, baseRoundness]
  );

  // Compute petal positions
  const computeRing = (count, radius, inset, angleOffset = 0) => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const deg = startAngle + angleOffset + (360 / count) * i;
      const rad = (deg * Math.PI) / 180;
      const cx = 100 + radius * Math.cos(rad);
      const cy = 100 + radius * Math.sin(rad);
      const transform = `translate(${cx} ${cy}) rotate(${deg + 90}) translate(0 ${-inset})`;
      const delayMs = i * 50;
      arr.push({ i, transform, delayMs });
    }
    return arr;
  };

  const outerData = useMemo(
    () => computeRing(outerPetals, outerRadius, baseInsetOuter, 0),
    [outerPetals, outerRadius, baseInsetOuter, startAngle]
  );
  const innerData = useMemo(
    () => computeRing(innerPetals, innerRadius, baseInsetInner, 180 / innerPetals),
    [innerPetals, innerRadius, baseInsetInner, startAngle]
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
        <p className="uppercase text-sm text-pink-400 font-medium tracking-wide mb-3">
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
          style={{ width: 224, height: 224 }}
          onMouseEnter={() => setBlossomed(true)}
        >
          {/* Background glow (pink-white) */}
          <motion.div
            className="absolute rounded-full bg-gradient-to-br from-pink-200 to-transparent opacity-25 blur-2xl"
            style={{ width: ringPx, height: ringPx }}
            animate={{ opacity: blossomed ? 0.55 : [0.25, 0.38, 0.25] }}
            transition={{ duration: 2, repeat: blossomed ? 0 : Infinity, ease: "easeInOut" }}
          />

          {/* Petals */}
          <svg
            viewBox="0 0 200 200"
            className="absolute pointer-events-none"
            style={{ width: 360, height: 360, overflow: "visible", zIndex: 20 }}
          >
            <defs>
              {/* Petal fill: white center → light pink edge */}
              <radialGradient id="lotusFillPink" cx="50%" cy="40%" r="70%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#ffe4ec" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0.65" />
              </radialGradient>
              {/* Stroke: soft pink */}
              <linearGradient id="lotusStrokePink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0.1" />
              </linearGradient>
              {/* Inner highlight */}
              <linearGradient id="lotusInnerWhite" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[...outerData, ...innerData].map(({ i, transform, delayMs }) => {
              const anim = blossomed
                ? { opacity: 0, transformOrigin: "0px 0px", animation: `petalIn 400ms ease-out ${delayMs}ms forwards` }
                : { opacity: 0 };
              const path = i < outerData.length ? pathOuter : pathInner;
              return (
                <g key={i} transform={transform}>
                  <path d={path} fill="url(#lotusFillPink)" style={anim} />
                  <path d={path} fill="url(#lotusFillPink)" stroke="url(#lotusStrokePink)" strokeWidth="0.8" style={anim} />
                  <path d={path} fill="url(#lotusInnerWhite)" style={{ ...anim, transform: "scale(0.78) translateY(3px)" }} />
                </g>
              );
            })}
          </svg>

          {/* Center circle for icon */}
          <div
            className="relative border border-pink-200/40 bg-pink-100/10 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_26px_#f9a8d4]"
            style={{ width: ringPx, height: ringPx, borderRadius: 9999, zIndex: 10 }}
          >
            {icon}
          </div>

          {/* Outline */}
          <motion.div
            className="absolute border border-pink-200/30"
            style={{ width: ringPx, height: ringPx, borderRadius: 9999, zIndex: 0 }}
            animate={{ scale: blossomed ? 1.02 : [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: blossomed ? 0 : Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes petalIn {
          0%   { opacity: 0; transform: scale(0.65) translateY(10px); }
          100% { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </motion.div>
  );
}
