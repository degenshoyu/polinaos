import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";

const markdown = `
## PolinaOS: Building Autonomous Communities with AI

## 1. Introduction

**Web3 teams ship faster than ever — but community coordination is still stuck in the past.**
As AI advances, a new wave of small, fast-moving teams is launching meme coins, DAOs, and tokenized side projects at record speed. From pump.fun to letsbonk.fun to Believe, a new era of permissionless community creation is here. But most teams still rely on spreadsheets, Google forms, and Discord chaos to manage contributors and distribute rewards.

**PolinaOS fixes that.**
It’s an autonomous operating system for Web3 communities — combining AI, Crypto Twitter data, and on-chain proof systems like Merkle claim contracts to automate everything from mission creation, to impact evaluation, to token reward distribution.
No more manual work. No more hunting down “who did what.” Teams can focus on building and inspiring — and let Polina handle the boring parts.

## 2. Problem & Opportunity

> Coordination is the bottleneck of decentralization.

> Decentralization empowers, but it doesn't justify chaos — we can be open and still organized.

| Problem                 | Description                                                        |
|-------------------------|--------------------------------------------------------------------|
| Fragmented Coordination | Creators juggle forms, bots, and mods to manage tasks and rewards. |
| Fake Engagement         | Bots and low-quality contributors dilute signal and impact.        |
| No Scalable Infra       | Most teams build one-off flows that don’t scale or generalize.     |

**Opportunity:** Build the CI/CD layer for community — a programmable, autonomous engine for contributor engagement.

## 3. What is PolinaOS

PolinaOS is a **modular coordination OS for Web3**. It uses AI to:

- 🧠 Generate weekly missions tailored to your project
- 📡 Track Twitter and on-chain actions in real time
- 🧮 Score and rank contributors based on verified impact
- 🎁 Automate token reward distribution to incentivize quality

## 4. Core Modules

> The PolinaOS stack is modular. Use one module or the full loop.

| Module             | Description                                                        |
|--------------------|--------------------------------------------------------------------|
| 🧠 AI Task Engine  | Auto-generates community quests from trends, goals, and token vibe |
| 📡 Twitter Scanner | Built on ctScreener, watches who’s shilling and what’s spreading   |
| 🏆 Leaderboard     | Wallet-linked ranking of contributors, updated weekly              |
| 🛠 Dashboard UX    | Admin and public dashboards to coordinate and track performance    |

#### 4.1 AI Task Engine
- Mission generation via AI tuned on crypto-native context
- Admin interface to edit or approve tasks
- Supports memes, quests, calls-to-action, social KPIs

#### 4.2 Twitter Scanner
- Puppeteer + rotating proxy + cookie pool infra
- Indexed by screen_name, tweet_id, token keyword
- Linked to ctScreener’s \\\`by-id\\\`, \\\`retweet\\\`, \\\`job\\\`, and \\\`user\\\` API layers

#### 4.3 Leaderboard + Rewards
- Snapshot ranking of contributors
- Configurable allocation rules (top X wallets / categories)
- On-chain claim system — Solana-based, soon EVM support

#### 4.4 Dashboard UX
- Mission lifecycle management
- Review logs, leaderboard, token balances
- Community-facing mission board (optionally token-gated)

---

## 5. Architecture Overview

\`\`\`text
+-------------+        +-------------------+
|  Creator UI | <----> | AI Task Generator |
+-------------+        +-------------------+
       |                          |
       v                          v
+----------------+        +------------------+
| Twitter Scanner| -----> | Scoring Engine   |
+----------------+        +------------------+
       |                          |
       v                          v
+----------------+        +--------------------+
| Reward System  | <----> | Claim Portal (Sol) |
+----------------+        +--------------------+
\`\`\`

> *All modules operate independently, but form a flywheel when combined.*

---

## 6. MVP Timeline

| Phase       | Milestone                                                     |
|-------------|---------------------------------------------------------------|
| July 2025   | Private Alpha — internal use by up to 3 partners              |
| August 2025 | Public Beta — open task generator + scanner + leaderboard     |
| Q4 2025     | PolinaFlow custom rules engine + cross-chain support          |

---

## 7. Security & Claims

- Signed contribution proofs
- Solana smart contracts for claim validation
- Future: ZK support for private Sybil-resistance

---

## 8. Expansion & Ecosystem

- Templates for meme contests, dev quests, influencer races
- Open APIs for DAO tools, rollup infra, reward aggregators
- Goal: PolinaOS becomes the **Zapier + Notion** of community ops

---

## 9. Call to Action

PolinaOS is forming its **founding circle**. Whether you’re a:

- 🛠 DAO builder
- 🧙 Meme engineer
- 🧠 Protocol founder
- ✨ Curious contributor

...you’re invited to shape the future of community coordination.

👉 Learn more: [polinaos.com](https://polinaos.com)
📬 Get in touch: [community@polinaos.com](mailto:community@polinaos.com)
`;

export default function DocsPage() {
  return (
    <main className="bg-black text-white min-h-screen font-sans">
      <Navbar />
      <div className="prose prose-invert max-w-4xl mx-auto px-6 py-20 prose-p:text-gray-300 prose-headings:text-white prose-a:text-[#64e3a1]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
          components={{
            h2: ({ node, ...props }) => (
              <h2 className="mt-10 mb-4 text-2xl font-bold text-[#64e3a1]" {...props} />
            ),
            code: ({ inline, className, children, ...props }) => {
              return !inline ? (
                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                  <code className={className} {...props}>{children}</code>
                </pre>
              ) : (
                <code className="bg-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </main>
  );
}
