import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import polinaIcon from "@/public/polina-icon.png";

export default function ProjectAnalysisCard({ onTweetCountUpdate, onAnalysisResult }) {
  const [projectName, setProjectName] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [status, setStatus] = useState("idle");
  const [messages, setMessages] = useState([
    {
      sender: "Polina",
      time: null,
      text: `👋 Hi, I’m Polina – your assistant for understanding how your project is performing on Twitter.

  I'll guide you through the whole process:
  1. Fetch the most recent 30 tweets that mention your project.
  2. Use AI to summarize the content, tone and trends.
  3. (Coming soon) Generate tailored community tasks and track engagement.

  ✨ Most features are still under development. For now, I can help you analyze up to 30 tweets. Want full access? Join the waitlist!`
    }
  ]);
  const [jobId, setJobId] = useState(null);
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!messages[0].time) {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => {
        const updated = [...prev];
        updated[0].time = time;
        return updated;
      });
    }
  }, []);

  const appendMessage = (text) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { sender: "Polina", time, text }]);
  };

  const friendlyMessage = (line) => {
    if (line.includes("Starting analysis")) return "Alright, let me take a look at what people have been saying about your project~";
    if (line.includes("Scanning for keywords")) return "I’m looking through Twitter for mentions like: " + line.split(":")[1]?.trim();
    if (line.includes("Job started")) return "Okay! I’ve kicked off the scan. Give me a moment...";
    if (line.includes("Scanning in progress")) return line.replace("⏳", "⌛") + " Almost there!";
    if (line.includes("Completed")) return "All done! I found " + line.match(/\d+/)?.[0] + " relevant tweets for you 💫";
    return line;
  };

  const handleAnalyze = async () => {
    if (!projectName.trim() && !twitterHandle.trim() && !contractAddress.trim()) {
      appendMessage("❌ Hmm... I need at least one field filled in to start scanning.");
      return;
    }
    setStatus("scanning");
    setMessages((prev) => prev.slice(0, 1));
    appendMessage("🔍 Starting analysis of your project...");

    try {
      const res = await fetch("/api/ctsearch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectName, twitterHandle, contractAddress })
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter(Boolean);
          lines.forEach((line) => {
            if (line.includes("Job submitted")) return;
            appendMessage(friendlyMessage(line));

            const jobMatch = line.match(/Job started: (.+)/);
            if (jobMatch && !jobId) {
              const id = jobMatch[1].trim();
              setJobId(id);
              pollJob(id);
            }
          });
        }
      } else {
        appendMessage("❌ Hmm, I couldn’t start the scan. Want to try again?");
        setStatus("error");
      }
    } catch (err) {
      appendMessage("❌ Something went wrong... Could you check your input?");
      setStatus("error");
    }
  };

  const pollJob = async (job_id) => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/jobProxy?job_id=${job_id}`);
      const data = await res.json();
      if (data.status === "completed") {
        clearInterval(interval);
        onTweetCountUpdate?.(data.tweets_count || 0);
        appendMessage(friendlyMessage(`✅ Completed: ${data.tweets_count || 0} tweets found.`));
        setStatus("complete");

        appendMessage("🧠 Let me analyze the content and extract key insights for you...");

        try {
          const aiRes = await fetch("/api/analyzeWithGemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tweets: data.tweets })
          });
          const { text } = await aiRes.json();
          appendMessage("📊 I’ve completed the analysis. Please check the full summary on the right side 👉");

          onAnalysisResult?.({
            summary: text,
            scores: {
              community: null,
              clarity: null,
              virality: null
            },
            themes: []
          });
        } catch (err) {
          appendMessage("❌ Sorry, Gemini AI is having trouble responding.");
        }
      } else {
        const count = data.tweets_count;
        let msg = `⏳ Scanning in progress...`;
        if (typeof count === "number") {
          onTweetCountUpdate?.(count);
          msg += ` ${count} tweets have been collected.`;
        }
        setMessages((prev) => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg?.text?.startsWith("⌛ Scanning in progress")) {
            const filtered = prev.slice(0, -1);
            return [...filtered, { sender: "Polina", time: lastMsg.time, text: friendlyMessage(msg) }];
          }
          return [...prev, { sender: "Polina", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), text: friendlyMessage(msg) }];
        });
      }
    }, 3000);
  };

  return (
    <div className="p-6 w-full lg:w-[48%] min-h-[640px] rounded-2xl shadow-2xl bg-gradient-to-br from-[#101c1b] via-[#0c1111] to-[#0a0f0e] flex flex-col border border-white/5 backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#2fd480] via-[#3ef2ac] to-[#27a567] text-transparent bg-clip-text drop-shadow-sm">
        Polina Assistant Console
      </h2>

      {/* message log */}
      <div ref={containerRef} className="px-4 py-3 space-y-4 text-sm h-[360px] overflow-y-auto border-t border-white/10">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <Image src={polinaIcon} alt="Polina" width={28} height={28} className="rounded-full" />
            <div>
              <div className="text-xs text-gray-400 mb-1">Polina{msg.time ? ` · ${msg.time}` : ""}</div>
              <div className="text-gray-200 font-mono leading-snug whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
<div className="flex gap-3 mb-4">
  {["Basic Info", "Task Goals", "Upcoming Events", "Audience & Strategy"].map((tab, idx) => (
    <button
      key={tab}
      className={`text-sm px-3 py-2 rounded-t-md border border-white/10 ${
        idx === 0
          ? "bg-[#0f1b17] text-white border-b-0"
          : "text-gray-500 bg-transparent cursor-not-allowed border-b"
      }`}
      disabled={idx !== 0}
    >
      {tab}
      {idx !== 0 && (
        <span className="ml-2 text-yellow-400 text-[10px]">🔒</span>
      )}
    </button>
  ))}
</div>

      {/* input fields */}
      <div className="mt-auto pt-4 space-y-3">
        <div className="flex gap-2">
          <input className="flex-1 px-3 py-2 bg-[#0d0d0d] border border-[#333] focus:ring-2 focus:ring-[#64e3a1] rounded-md text-white placeholder:text-gray-500 text-sm" placeholder="Project name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          <input className="flex-1 px-3 py-2 bg-[#0d0d0d] border border-[#333] focus:ring-2 focus:ring-[#64e3a1] rounded-md text-white placeholder:text-gray-500 text-sm" placeholder="Twitter handle (e.g. @project)" value={twitterHandle} onChange={(e) => setTwitterHandle(e.target.value)} />
        </div>
        <input className="w-full px-3 py-2 bg-[#0d0d0d] border border-[#333] focus:ring-2 focus:ring-[#64e3a1] rounded-md text-white placeholder:text-gray-500 text-sm" placeholder="Token contract address (optional)" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />

        <button
          onClick={handleAnalyze}
          disabled={status === "scanning"}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#27a567] to-[#2fd480] hover:from-[#239e5d] hover:to-[#38ec9c] text-white rounded-md text-sm font-semibold transition shadow"
        >
          {status === "scanning" ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Analyzing...
            </>
          ) : (
            "✨ Send"
          )}
        </button>
      </div>
    </div>
  );
}
