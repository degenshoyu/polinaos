import Image from "next/image";
import polinaIcon from "@/public/polina-icon.png";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

export default function PolinaAnalysisCard({ geminiText }) {
  if (!geminiText) return null;

  const sections = splitSections(geminiText);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="p-6 w-full max-w-3xl rounded-2xl shadow-2xl bg-gradient-to-br from-[#101c1b] via-[#0c1111] to-[#0a0f0e] flex flex-col border border-white/5 backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#2fd480] via-[#3ef2ac] to-[#27a567] text-transparent bg-clip-text drop-shadow-sm">
        Polina · AI Understanding
      </h2>

      <div className="flex items-start gap-3 mb-4">
        <Image src={polinaIcon} alt="Polina" width={28} height={28} className="rounded-full" />
        <div>
          <div className="text-xs text-gray-400 mb-1">Polina · AI Agent</div>
          <p className="leading-snug text-gray-300">
            Here's what I discovered about your project, based on the tweets collected:
          </p>
        </div>
      </div>

      {sections.length === 0 ? (
        <div className="bg-[#1a1a1a] rounded-lg p-4 border border-white/10">
          <ReactMarkdown components={markdownComponents}>
            {geminiText}
          </ReactMarkdown>
        </div>
      ) : (
        sections.map((sec, idx) => (
          <div
            key={idx}
            className="bg-[#1a1a1a] rounded-lg border border-white/10 mb-3"
          >
            <div
              className="p-4 cursor-pointer text-sm font-semibold text-white"
              onClick={() => setOpenIndex(idx)}
            >
              {sec.title}
            </div>

            {openIndex === idx && (
              <div className="p-4 pt-0">
                <ReactMarkdown components={markdownComponents}>
                  {sec.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const markdownComponents = {
  p: ({ node, ...props }) => (
    <p className="text-sm text-gray-300 leading-relaxed mb-2" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="list-disc list-inside text-sm text-gray-300 pl-4" {...props} />
  ),
  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
  strong: ({ node, ...props }) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="text-white text-base font-bold mt-4 mb-2" {...props} />
  ),
};

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

  return rawSections.filter((sec) => sec.title.toLowerCase() !== "gemini analysis");
}
