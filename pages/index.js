import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/Navbar";
import FeatureBlock from "../components/FeatureBlock";
import VisionBlock from "../components/VisionBlock";
import RoadmapBlock from "../components/RoadmapBlock";
import WaitlistModal from "../components/WaitlistModal";
import { Bot, Radar, CheckCheck, Vault } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <>
      <Head>
        <title>PolinaOS - Your AI co-pilot for community growth</title>
        <meta
          name="description"
          content="Polina helps you auto-generate Twitter tasks, track shillers, and reward contributions — all on-chain and autonomous."
        />
        <meta
          property="og:title"
          content="PolinaOS - Your AI co-pilot for community growth"
        />
        <meta
          property="og:description"
          content="Polina helps you auto-generate Twitter tasks, track shillers, and reward contributions — all on-chain and autonomous."
        />
        <meta
          property="og:image"
          content="https://polinaos.com/polina-og.png"
        />
        <meta property="og:url" content="https://polinaos.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="PolinaOS - Your AI co-pilot for community growth"
        />
        <meta
          name="twitter:description"
          content="Generate missions, verify reach, and distribute rewards automatically with Polina."
        />
        <meta
          name="twitter:image"
          content="https://polinaos.com/polina-og.png"
        />
      </Head>

      <main className="min-h-screen px-4 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans">
        {/* Header */}
        <Navbar onWaitlistClick={() => setShowWaitlist(true)} />

        {/* Hero */}
        <section className="relative bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-start gap-12 z-10 relative">
            {/* left text block */}
            <div className="mt-12 md:mt-24">
              <h1 className="text-5xl md:text-6xl font-sora font-bold tracking-tight leading-tight mb-6 animate-fade-in bg-gradient-to-b from-white to-[#27a567] bg-clip-text text-transparent">
                <span className="text-[#27a567] font-extrabold">Polina</span> is
                your AI co-pilot for community growth.
              </h1>
              <p className="text-gray-300 text-xl mb-8 max-w-xl">
                From task generation and engagement tracking to on-chain reward
                distribution – everything runs autonomously, so you can focus on
                building your product.
              </p>
              <a
                onClick={() => setShowWaitlist(true)}
                className="cursor-pointer bg-[#27a567] hover:bg-[#239e5d] text-white font-semibold px-8 py-3 rounded-full shadow hover:scale-105 transition"
              >
                Join Waitlist
              </a>
            </div>

            {/* right Polina image */}
            <div className="flex justify-center md:justify-end self-start place-self-start mt-6">
              <Image
                src="/polina-final.png"
                alt="Polina character"
                width={420}
                height={560}
                className="w-[420px] h-auto drop-shadow-xl animate-float"
                priority
              />
            </div>
          </div>
        </section>

        <WaitlistModal
          open={showWaitlist}
          onClose={() => setShowWaitlist(false)}
        />

        {/* Features */}
        <section
          id="features"
          className="py-32 px-6 max-w-6xl mx-auto space-y-28"
        >
          <FeatureBlock
            label="Mission Engine"
            title="AI-generated tasks aligned with market trends."
            description="Polina analyzes your token’s position and crypto narrative shifts to auto-create high-impact missions that activate your community without manual setup."
            icon={<Bot className="h-14 w-14 text-[#64e3a1]" />}
          />

          <FeatureBlock
            label="Awareness Intelligence"
            title="Know who’s shilling you — and how far it spreads."
            description="Powered by ctScreener, Polina tracks who’s talking about your token, what narratives they use, and how they perform across Twitter and beyond."
            icon={<Radar className="h-14 w-14 text-[#64e3a1]" />}
            reverse
          />

          <FeatureBlock
            label="Contribution Proof"
            title="No more spreadsheets. Just proof of effort."
            description="Polina automatically verifies content, reach, and engagement metrics. So you always know who your top contributors are. Trustless, scalable validation."
            icon={<CheckCheck className="h-14 w-14 text-[#64e3a1]" />}
          />

          <FeatureBlock
            label="On-Chain Incentives"
            title="Token rewards. Claimed, not assigned."
            description="Set your weekly reward pool and let shillers claim tokens based on verified effort. No manual payouts, just on-chain fairness."
            icon={<Vault className="h-14 w-14 text-[#64e3a1]" />}
            reverse
          />
        </section>

        {/* Vision Block */}
        <VisionBlock />

        {/* Roadmap / Timeline Block */}
        <section id="roadmap">
          <RoadmapBlock />
        </section>

        {/* Early Supporter Invitation Block */}
        <section className="relative py-32 px-6 max-w-6xl mx-auto overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-60 bg-gradient-to-tr from-[#64e3a1]/20 via-transparent to-[#64e3a1]/5" />

          <div className="grid md:grid-cols-2 gap-16 items-center bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-10 md:p-16">
            {/* Text block */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-[#64e3a1] mb-6">
                Join Polina’s Founding Circle ✨
              </h2>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                We’re inviting the first 100 believers to shape what community
                coordination looks like in the AI era. Whether you’re a builder,
                shill scout, protocol poet, memelord, or DAO alchemist — this
                space is yours to co-create.
              </p>
              <a
                onClick={() => setShowWaitlist(true)}
                className="inline-flex items-center justify-center rounded-full bg-[#27a567] hover:bg-[#239e5d] text-white font-semibold px-8 py-4 transition shadow-lg cursor-pointer text-base"
              >
                Join Waitlist
              </a>
            </div>

            {/* Polina image block */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-[300px] h-auto">
                <Image
                  src="/polina-join.png"
                  alt="Polina welcomes you"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-2xl drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 pb-10">
          © {new Date().getFullYear()} PolinaOS - Powering creators, curators,
          and community architects.
        </footer>
      </main>
    </>
  );
}
