import Link from "next/link";

export default function NavLinks({ active = "" }) {
  const links = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "Roadmap", href: "/#roadmap" },
    { label: "Docs", href: "/docs" },
    { label: "Community", href: "/community" },
  ];

  return (
    <>
      {links.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={`text-sm transition hover:text-white ${
            active === href ? "text-white font-semibold" : "text-white/80"
          }`}
        >
          {label}
        </Link>
      ))}

      <span className="text-white/40 text-sm cursor-not-allowed">
        Onboard <span className="bg-white/10 text-white text-xs px-2 py-0.5 rounded-full ml-1">soon</span>
      </span>
    </>
  );
}
