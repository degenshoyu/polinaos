import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import Navbar from '../../components/Navbar';
import WaitlistModal from '../../components/WaitlistModal';
import DocsLayout from "../../components/DocsLayout";
import { useState } from 'react';

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/docs'));
  const paths = files.map((file) => ({
    params: { slug: file.replace(/\.md$/, '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content/docs', `${params.slug}.md`);
  const markdown = fs.readFileSync(filePath, 'utf-8');
  return { props: { markdown, slug: params.slug } };
}

export default function DocPage({ markdown, slug }) {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <>
      <Head>
        <title>{slug} | PolinaOS Docs</title>
        <meta name="description" content={`Documentation page: ${slug}`} />
      </Head>
      <main className="bg-black text-white min-h-screen font-sans">
        <Navbar onWaitlistClick={() => setShowWaitlist(true)} />
        <div className="prose prose-invert max-w-4xl mx-auto px-6 py-20 prose-p:text-gray-300 prose-headings:text-white prose-a:text-[#64e3a1] prose-table:border prose-th:border prose-td:border">
    <DocsLayout>
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
    </DocsLayout>
        </div>
        <WaitlistModal open={showWaitlist} onClose={() => setShowWaitlist(false)} />
      </main>
    </>
  );
}
