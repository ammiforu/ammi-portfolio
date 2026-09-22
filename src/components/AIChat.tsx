import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';




const FAQ: Record<string, string> = {
  experience: "Ammi has **20+ years** of enterprise IT experience, currently leading a 14-person global engineering team at GEODIS (one of the world's largest 3PL companies). He manages IBM Sterling B2B, WMS, and IBM MQ infrastructure at scale.",
  skills: "**Enterprise:** IBM Sterling B2B Integrator, IBM MQ, WMS (Manhattan Associates), EDI (X12/EDIFACT/AS2)\n**AI/Dev:** React, Python, FastAPI, LLMs, RAG pipelines, Gemini API\n**Cloud:** GCP, Azure AD, AWS",
  projects: "**AuthPortal** — Enterprise IAM system built solo with MSAL + Azure AD + React\n**YouTube AI Engine** — End-to-end automated content pipeline (1,670+ subscribers, 624K+ views)\n**EDI Automation** — Reduced manual touchpoints by 70% across 500+ trading partners",
  availability: "Ammi is **open to opportunities** and can discuss timeline during conversations. He's based in Franklin, TN and open to remote roles globally.",
  contact: "📧 ammitetala@gmail.com\n📞 +1 (925) 663-5429\nBest approach: Email or use the contact form below.",
  salary: "Ammi is open to discussing compensation based on the role scope. Best to connect directly for confidential discussions.",
  location: "Based in **Franklin, TN** (Nashville metro). Open to **full remote** or hybrid. Can travel as needed.",
  team: "Currently leads a **14-person global engineering team** spanning US and India at GEODIS.",
  education: "Ammi's expertise is built on 20+ years of hands-on enterprise engineering. Practical, certified proficiency across IBM, Microsoft, and cloud platforms.",
};

function matchFAQ(query: string): string | null {
  const q = query.toLowerCase();
  if (/experience|years|background|career|history|worked/.test(q)) return FAQ.experience;
  if (/skill|tech|stack|know|expertise|language|tool/.test(q)) return FAQ.skills;
  if (/project|built|made|creat|work|portfolio/.test(q)) return FAQ.projects;
  if (/avail|hire|start|when|open/.test(q)) return FAQ.availability;
  if (/contact|reach|email|phone|connect/.test(q)) return FAQ.contact;
  if (/salary|pay|compens|rate|cost/.test(q)) return FAQ.salary;
  if (/locat|where|remote|office|relocat/.test(q)) return FAQ.location;
  if (/team|manage|lead|people|report/.test(q)) return FAQ.team;
  if (/degree|school|college|educat|certif/.test(q)) return FAQ.education;
  return null;
}

async function askGemini(userMessage: string): Promise<string> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });
    if (!res.ok) return '';
    const data = await res.json();
    return data.reply ?? '';
  } catch {
    return '';
  }
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const SUGGESTIONS = [
  "What's Ammi's experience?",
  "What tech skills does he have?",
  "Tell me about his projects",
  "Is he available to hire?",
];

export const AIChat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "👋 Hi! I'm Ammi's AI assistant. Ask me anything about his experience, skills, or availability — I'll answer instantly.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setInput('');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Try FAQ match first (instant, no API needed)
    const faqAnswer = matchFAQ(text);

    // Try secure server-side proxy (key never exposed to browser)
    const geminiAnswer = await askGemini(text);

    const answer = geminiAnswer || faqAnswer || "I'd recommend reaching out to Ammi directly at ammitetala@gmail.com for that specific question. He responds quickly!";

    setMessages(prev => [
      ...prev,
      { id: Date.now().toString() + 'r', role: 'assistant', text: answer },
    ]);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Render markdown-lite (bold)
  const renderText = (text: string) =>
    text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
      part.startsWith('**') ? <strong key={i} className="text-white">{part.slice(2, -2)}</strong> : part
    );

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#3b82f6] shadow-[0_0_24px_rgba(0,240,255,0.5)] flex items-center justify-center text-[#050811] transition-all duration-300"
        aria-label="Open AI Chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px] flex flex-col rounded-3xl bg-[#0d0d14] border border-white/10 shadow-[0_0_60px_rgba(0,240,255,0.12)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8 bg-[#111118]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#3b82f6] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#050811]" />
              </div>
              <div>
                <div className="text-sm font-bold font-syne text-white flex items-center gap-1.5">
                  Ammi's AI Assistant
                  <Sparkles className="w-3 h-3 text-[#00f0ff]" />
                </div>
                <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online · Answers instantly
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-2 items-start ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] ${
                    msg.role === 'assistant'
                      ? 'bg-gradient-to-br from-[#00f0ff] to-[#3b82f6] text-[#050811]'
                      : 'bg-[#1a1a28] border border-white/10 text-[#9496a8]'
                  }`}>
                    {msg.role === 'assistant' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'assistant'
                      ? 'bg-[#1a1a2e] border border-white/8 text-[#c8c9d4]'
                      : 'bg-gradient-to-r from-[#00f0ff]/20 to-[#3b82f6]/20 border border-[#00f0ff]/20 text-white'
                  }`}>
                    {renderText(msg.text)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#3b82f6] flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-[#050811]" />
                  </div>
                  <div className="px-3.5 py-2.5 rounded-2xl bg-[#1a1a2e] border border-white/8">
                    <Loader2 className="w-4 h-4 text-[#00f0ff] animate-spin" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Suggestions (only shown when only welcome message) */}
            {messages.length === 1 && (
              <div className="px-4 pb-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-[10px] font-mono px-3 py-1.5 rounded-full border border-white/10 bg-[#1a1a28] text-[#9496a8] hover:border-[#00f0ff]/40 hover:text-[#00f0ff] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2 px-4 py-3 border-t border-white/8 bg-[#111118]">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about skills, projects, availability..."
                className="flex-1 bg-[#1a1a28] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-[#9496a8]/60 focus:outline-none focus:border-[#00f0ff]/40 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#3b82f6] flex items-center justify-center disabled:opacity-40 shrink-0 hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all"
              >
                <Send className="w-4 h-4 text-[#050811]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
