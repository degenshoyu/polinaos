import Image from "next/image";
import polinaIcon from "@/public/polina-icon.png";
import ReactMarkdown from "react-markdown";

export default function PolinaAnalysisCard({ geminiText }) {
  if (!geminiText) return null;

  const sections = splitSections(geminiText);

  return (
    <div className="p-6 w-full max-w-3xl rounded-2xl shadow-xl bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#111827] flex flex-col">
      <h2 className="text-sm text-gray-400 tracking-wider uppercase pb-2 mb-3">Polina · AI Understanding</h2>

      <div className="flex items-start gap-3 mb-4">
        <Image src={polinaIcon} alt="Polina" width={28} height={28} className="rounded-full" />
        <div>
          <div className="text-xs text-gray-400 mb-1">Polina · AI Agent</div>
          <p className="leading-snug text-gray-300">
            Here's what I discovered about your project, based on the tweets collected:
          </p>
        </div>
      </div>

      {sections.map((sec, idx) => (
        <details
          key={idx}
          className="bg-[#1e1e1e] rounded-lg p-4 border border-white/10 mb-3"
          open={idx === 0}
        >
          <summary className="cursor-pointer text-sm font-semibold text-white">
            {sec.title}
          </summary>
<ReactMarkdown
  components={{
    p: ({ node, ...props }) => (
      <p className="text-sm text-gray-300 leading-relaxed mb-2" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc list-inside text-sm text-gray-300 pl-4" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="mb-1" {...props} />
    ),
    strong: ({ node, ...props }) => (
      <strong className="text-white font-semibold" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-white text-base font-bold mt-4 mb-2" {...props} />
    )
  }}
>
  {sec.content}
</ReactMarkdown>
        </details>
      ))}
    </div>
  );
}

function splitSections(text) {
  const sectionRegex = /###\s+(.*?)\n/gi;
  const rawSections = [];
  let match;
  let lastIndex = 0;

  while ((match = sectionRegex.exec(text)) !== null) {
    if (rawSections.length > 0) {
      rawSections[rawSections.length - 1].content = text.slice(lastIndex, match.index).trim();
    }
    rawSections.push({ title: match[1].trim(), content: "" });
    lastIndex = match.index + match[0].length;
  }

  if (rawSections.length > 0) {
    rawSections[rawSections.length - 1].content = text.slice(lastIndex).trim();
  } else {
    rawSections.push({ title: "Gemini Analysis", content: text });
  }

  return rawSections;
}
