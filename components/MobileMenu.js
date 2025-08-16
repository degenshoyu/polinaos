"use client";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import navLinks from "./navLinks.config";
import Link from "next/link";

export default function MobileMenu({ active = "", onWaitlistClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="text-white hover:text-[#64e3a1] focus:outline-none"
      >
        <Menu size={28} />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[999]" onClose={setIsOpen}>
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          </Transition.Child>

          {/* Menu panel */}
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in duration-200 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 w-full bg-gray-950 p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white font-bold text-lg">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                {navLinks.map(({ label, href, disabled }) =>
                  disabled ? (
                    <span
                      key={label}
                      className="text-white/40 text-sm cursor-not-allowed"
                    >
                      {label}
                      <span className="bg-white/10 text-white text-xs px-2 py-0.5 rounded-full ml-1">
                        soon
                      </span>
                    </span>
                  ) : (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={`text-white font-medium transition hover:text-[#64e3a1] ${
                        active === href ? "text-[#64e3a1]" : ""
                      }`}
                    >
                      {label}
                    </Link>
                  ),
                )}
              </nav>
              <div className="mt-8">
                <Link
                  href="https://demo.polinaos.com"
                  onClick={() => setIsOpen(false)}
                  className="block text-center w-full bg-[#27a567] hover:bg-[#239e5d] text-white text-sm font-semibold py-3 rounded-full shadow-md transition"
                >
                  Try Demo
                </Link>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
