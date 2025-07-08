import { useEffect, useState } from "react";

const SECTION_IDS = ["#features", "#roadmap"];

export default function useScrollSpy() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handler = () => {
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.querySelector(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            current = id;
            break;
          }
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return active;
}

