import Image from "next/image";
import { motion } from "framer-motion";

const phases = [
  {
    title: "Phase 1 – Activation",
    description:
      "AI-generated community missions, personalized to your token. Smart scoring of Twitter engagement using ctScreener.",
    image: "/roadmap/phase1.png",
    reverse: false,
  },
  {
    title: "Phase 2 – Incentivization",
    description:
      "Token claim portal. Weekly rewards for top contributors. Fully on-chain, permissionless, and automated.",
    image: "/roadmap/phase2.png",
    reverse: false,
  },
  {
    title: "Phase 3 – Autonomy",
    description:
      "PolinaFlow: No-code rules for mission design, social triggers, and reward logic. Let your community coordinate itself.",
    image: "/roadmap/phase3.png",
    reverse: false,
  },
];

export default function RoadmapBlock() {
  return (
    <section className="py-32 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-20">
        The Road to Autonomous Communities
      </h2>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#64e3a1]/20 z-0" />

        <div className="space-y-32 relative z-10">
          {phases.map((phase, idx) => (
            <motion.div
              key={idx}
              className={`relative grid md:grid-cols-2 gap-12 items-center ${phase.reverse ? 'md:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              {/* Timeline dot */}
              <div className={`hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#64e3a1] z-20`} />

              {/* Text Block */}
              <div className={`md:order-1 order-2 ${phase.reverse ? 'md:col-start-2' : 'md:col-start-1'}`}>
                <h3 className="text-xl font-bold text-[#64e3a1] mb-4">
                  {phase.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {phase.description}
                </p>
              </div>

              {/* Image Block with glow */}
              <div className={`relative md:order-2 order-1 flex justify-center ${phase.reverse ? 'md:justify-start' : 'md:justify-end'}`}>
                <div className="relative w-full max-w-sm">
                  {/* Glow background */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#64e3a1]/30 via-transparent to-transparent blur-2xl opacity-60 z-0" />
                  <Image
                    src={phase.image}
                    alt={phase.title}
                    width={480}
                    height={320}
                    className="rounded-2xl object-contain border border-white/10 shadow-xl relative z-10"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

