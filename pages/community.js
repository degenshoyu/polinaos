// pages/community.js
import Navbar from "../components/Navbar";
import Head from "next/head";
import { FaTelegramPlane, FaTwitter, FaGithub } from "react-icons/fa";
import { SiGoogledrive, SiBuymeacoffee } from "react-icons/si";

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

          {/* 第一行按钮 */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6">
            <a
              href="https://t.me/PolinaOSAI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#27a567] hover:bg-[#239e5d] text-white px-6 py-3 rounded-full font-semibold transition shadow-md"
            >
              <FaTelegramPlane size={20} /> Join Telegram
            </a>

            <a
              href="https://x.com/PolinaAIOS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white px-6 py-3 rounded-full font-semibold transition shadow-md"
            >
              <FaTwitter size={20} /> Follow on Twitter
            </a>

            <a
              href="https://github.com/degenshoyu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold transition shadow-md"
            >
              <FaGithub size={20} /> Dev GitHub
            </a>
          </div>

          {/* 第二行按钮 */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a
              href="https://pump.fun/coin/HDcnhYb3SanahSfipjoRp2MT37q3H7jpjfsCzeGBpump"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-white px-6 py-3 rounded-full font-semibold transition shadow-md"
            >
              <SiBuymeacoffee size={20} /> Buy $POLINA
            </a>

            <a
              href="https://drive.google.com/drive/folders/1tobQ3tHPaXuW1uMNUOLky1_dMB0B59_q?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#9333ea] hover:bg-[#7e22ce] text-white px-6 py-3 rounded-full font-semibold transition shadow-md"
            >
              <SiGoogledrive size={20} /> Brand Assets
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

