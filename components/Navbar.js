import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import useScrollSpy from "./useScrollSpy";

export default function Navbar({ onWaitlistClick }) {
  const active = useScrollSpy();

  return (
    <header className="flex justify-center px-4 py-6 sticky top-0 z-50 bg-transparent">
      <div className="flex items-center justify-between w-full max-w-6xl bg-white/10 backdrop-blur-md shadow-md px-6 py-3 rounded-full">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo-polina.png"
            alt="PolinaOS Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-white font-bold text-xl font-sora">
            PolinaOS
          </span>
        </Link>

        {/* Nav items */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLinks active={active} />
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <MobileMenu active={active} onWaitlistClick={onWaitlistClick} />
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="https://pump.fun/coin/HDcnhYb3SanahSfipjoRp2MT37q3H7jpjfsCzeGBpump"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[#f59e0b] hover:bg-[#d97706] text-white text-sm rounded-full shadow-md transition"
          >
            Buy $POLINA
          </Link>
          <Link
            href="https://demo.polinaos.com"
            className="px-5 py-2 bg-[#27a567] hover:bg-[#239e5d] text-white text-sm rounded-full shadow-md transition"
          >
            Try Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
