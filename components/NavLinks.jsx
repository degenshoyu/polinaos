import Link from "next/link";
import navLinks from "./navLinks.config";

export default function NavLinks({ active = "" }) {
  return (
    <>
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
            className={`text-sm transition hover:text-white ${
              active === href ? "text-white font-semibold" : "text-white/80"
            }`}
          >
            {label}
          </Link>
        )
      )}
    </>
  );
}
