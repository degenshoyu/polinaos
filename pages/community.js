// pages/community.js
import Navbar from "../components/Navbar";
import Head from "next/head";

export default function CommunityPage() {
  return (
    <>
      <Head>
        <title>Community | PolinaOS</title>
      </Head>

      <main className="min-h-screen px-4 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white font-sans">
        <Navbar />

        <section className="max-w-4xl mx-auto py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#64e3a1] mb-6">
            Welcome to the PolinaOS Community
          </h1>
          <p className="text-lg text-gray-300 mb-12">
            Join our early community of creators, builders, and memelords
            shaping the future of AI-powered crypto coordination.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a
              href="https://t.me/PolinaOSAI"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#27a567] hover:bg-[#239e5d] text-white px-6 py-3 rounded-full font-semibold transition shadow-md"
            >
              Join Telegram
            </a>

            <a
              href="https://x.com/PolinaOSAI"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white px-6 py-3 rounded-full font-semibold transition shadow-md"
            >
              Follow on Twitter
            </a>

            <a
              href="https://pump.fun/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f59e0b] hover:bg-[#d97706] text-white px-6 py-3 rounded-full font-semibold transition shadow-md"
            >
              Buy $POLINA
            </a>
          </div>
        </section>

        <footer className="text-center text-sm text-gray-500 pb-10">
          © {new Date().getFullYear()} PolinaOS – Where community meets
          automation.
        </footer>
      </main>
    </>
  );
}
