import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#top" },
  { label: "Features", href: "#features" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Join", href: "#get-started" },
];

export default function MobileMenu({ active }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-[#64e3a1] focus:outline-none"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[999]">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={close}
          />

          {/* Sliding menu panel */}
          <div
            className="fixed right-0 top-0 h-full w-full bg-gray-950 p-6 space-y-6 shadow-2xl border-l border-white/10
                       transform transition-transform duration-300 ease-in-out translate-x-0"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-white font-bold text-lg">Menu</span>
              <button onClick={close} className="text-white">
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={`text-white font-medium transition hover:text-[#64e3a1] ${
                    active === link.href ? "text-[#64e3a1]" : ""
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#get-started"
              onClick={close}
              className="block mt-8 bg-[#27a567] hover:bg-[#239e5d] text-white text-center font-semibold py-3 rounded-full shadow-md transition"
            >
              Join Whitelist
            </a>
          </div>
        </div>
      )}
    </>
  );
}
