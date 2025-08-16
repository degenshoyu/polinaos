// components/FeatureBlock.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function FeatureBlock({ icon, title, label, description, reverse = false }) {
  const containerClass = reverse ? "md:flex-row-reverse" : "md:flex-row";

  // Persist petals once revealed
  const [petalsShown, setPetalsShown] = useState(false);

  // Petal angles around the circle (lotus-like symmetry)
  const PETAL_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

  // Framer Motion variants for staggered blossom effect
  const petalsVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    shown: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.05, when: "beforeChildren", duration: 0.45, ease: "easeOut" },
    },
  };

  const petalVariants = {
    hidden: { opacity: 0, scale: 0.4, y: 10 },
    shown: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

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
          {/* Glowing animated background ring (smaller) */}
          <motion.div
            className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-[#64e3a1] to-transparent opacity-25 blur-2xl"
            animate={{ opacity: petalsShown ? 0.5 : [0.25, 0.35, 0.25] }}
            transition={{ duration: 2, repeat: petalsShown ? 0 : Infinity, ease: "easeInOut" }}
          />

          {/* Lotus petals (SVG so shapes are crisp) */}
          <motion.svg
            viewBox="0 0 200 200"
            className="absolute w-[260px] h-[260px] pointer-events-none"
            variants={petalsVariants}
            initial="hidden"
            animate={petalsShown ? "shown" : "hidden"}
          >
            {/* Gradient defs */}
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

            {/* Draw petals as rotated ellipses around center (100,100) */}
            {PETAL_ANGLES.map((deg, i) => (
              <motion.g
                key={deg}
                variants={petalVariants}
                transform={`rotate(${deg} 100 100)`}
              >
                {/* Soft glow behind each petal */}
                <ellipse
                  cx="100"
                  cy="54"
                  rx="12"
                  ry="26"
                  fill="url(#lotusFill)"
                />
                {/* Petal body with subtle stroke */}
                <ellipse
                  cx="100"
                  cy="54"
                  rx="11"
                  ry="24"
                  fill="url(#lotusFill)"
                  stroke="url(#lotusStroke)"
                  strokeWidth="0.6"
                />
              </motion.g>
            ))}
          </motion.svg>

          {/* Icon Circle (smaller, with hover pop) */}
          <div className="relative z-10 w-40 h-40 rounded-full border border-[#64e3a1]/40 bg-[#64e3a1]/10 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-105 group-hover:shadow-[0_0_26px_#64e3a1] duration-300">
            {icon}
          </div>

          {/* Thin ring outline to emphasize the circle */}
          <motion.div
            className="absolute w-40 h-40 rounded-full border border-[#64e3a1]/30"
            animate={{ scale: petalsShown ? 1.02 : [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: petalsShown ? 0 : Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
