// components/FeatureBlock.jsx
import { motion } from "framer-motion";

export default function FeatureBlock({ icon, title, label, description, reverse = false }) {
  const containerClass = reverse
    ? "md:flex-row-reverse"
    : "md:flex-row";

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

      {/* Icon Section */}
      <div className="flex-1 flex justify-center md:justify-end">
        <div className="relative group w-52 h-52 flex items-center justify-center">
          {/* Glowing animated background ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#64e3a1] to-transparent opacity-30 blur-2xl group-hover:opacity-50 transition" />

          {/* Icon Circle */}
          <div className="relative z-10 w-52 h-52 rounded-full border border-[#64e3a1]/40 bg-[#64e3a1]/10 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-105 group-hover:shadow-[0_0_30px_#64e3a1] duration-300">
            {icon}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

