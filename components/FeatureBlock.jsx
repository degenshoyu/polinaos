// components/FeatureBlock.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function FeatureBlock({ icon, title, label, description, reverse = false }) {
  const containerClass = reverse ? "md:flex-row-reverse" : "md:flex-row";
  const [petalsShown, setPetalsShown] = useState(false);

  // ===== Lotus config =====
  const PETALS = 12;        // 渲染全部花瓣
  const START_ANGLE = -90;  // 顶部开始
  const PETAL_RADIUS = 92;  // 花瓣离圆心的距离 (调大=>更靠外)
  const PETAL_RX = 11;      // 花瓣横向半径
  const PETAL_RY = 26;      // 花瓣纵向半径
  // ========================

  const angles = Array.from({ length: PETALS }, (_, i) => START_ANGLE + (360 / PETALS) * i);

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
          onMouseEnter={() => setPetalsShown(true)} // 触发一次后常驻
        >
          {/* 背景呼吸光 (在最底层) */}
          <motion.div
            className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-[#64e3a1] to-transparent opacity-25 blur-2xl z-0"
            animate={{ opacity: petalsShown ? 0.5 : [0.25, 0.35, 0.25] }}
            transition={{ duration: 2, repeat: petalsShown ? 0 : Infinity, ease: "easeInOut" }}
          />

          {/* 花瓣: 放在圆圈之上，保证不被遮挡 */}
          <svg
            viewBox="0 0 200 200"
            className="absolute w-[300px] h-[300px] overflow-visible pointer-events-none z-20"
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

            {angles.map((deg, i) => (
              <motion.g
                key={deg}
                initial={{ opacity: 0, scale: 0.6, y: 10 }}
                animate={petalsShown ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 10 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: petalsShown ? i * 0.06 : 0 }}
                transform={`rotate(${deg} 100 100)`}
              >
                {/* 以 (100,100) 为圆心，沿半径向上放置花瓣 */}
                <ellipse
                  cx="100"
                  cy={100 - PETAL_RADIUS}
                  rx={PETAL_RX + 1}
                  ry={PETAL_RY + 2}
                  fill="url(#lotusFill)"
                />
                <ellipse
                  cx="100"
                  cy={100 - PETAL_RADIUS}
                  rx={PETAL_RX}
                  ry={PETAL_RY}
                  fill="url(#lotusFill)"
                  stroke="url(#lotusStroke)"
                  strokeWidth="0.6"
                />
              </motion.g>
            ))}
          </svg>

          {/* 中心圆圈（位于花瓣下方还是上方取决于 z-index；这里让花瓣在上面） */}
          <div className="relative z-10 w-40 h-40 rounded-full border border-[#64e3a1]/40 bg-[#64e3a1]/10 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-105 group-hover:shadow-[0_0_26px_#64e3a1] duration-300">
            {icon}
          </div>

          {/* 细描边环 */}
          <motion.div
            className="absolute w-40 h-40 rounded-full border border-[#64e3a1]/30 z-0"
            animate={{ scale: petalsShown ? 1.02 : [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: petalsShown ? 0 : Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
