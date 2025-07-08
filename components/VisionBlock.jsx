import { motion } from "framer-motion";
import Image from "next/image";

export default function VisionBlock() {
  return (
    <motion.section
      className="max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 items-center gap-16"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Polina Image (left) */}
      <div className="flex justify-center">
        <div className="relative w-[320px] h-auto">
          <Image
            src="/polina_vision.png"
            alt="Polina AI builder"
            width={320}
            height={480}
            className="w-full h-auto drop-shadow-2xl animate-float-slow"
          />
        </div>
      </div>

      {/* Text (right) */}
      <div>
        <p className="uppercase text-sm text-[#64e3a1] font-semibold tracking-wide mb-2">
          Why we’re building Polina
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
          Community infrastructure, reimagined for Web3.
        </h2>

        <div className="space-y-5 text-gray-400 text-lg leading-relaxed">
          <p>
            Most teams build like it’s 2025 — but manage communities like it’s
            still 2019. Spreadsheets, Discord bots, bounty forms... It’s noisy.
          </p>
          <p>
            We believe your community engine should be as modular and
            automated as your dev stack. That’s why we built Polina — to turn
            engagement into programmable growth.
          </p>
        </div>

        <p className="text-white text-xl font-medium mt-8">
          Build fast. Let your community scale itself.
        </p>
      </div>
    </motion.section>
  );
}
