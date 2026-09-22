import type { VercelRequest, VercelResponse } from '@vercel/node';

const RESUME_CONTEXT = `
You are Ammi Reddy Tetala's AI portfolio assistant. Answer recruiter/hiring-manager questions about Ammi concisely and professionally. Keep answers under 120 words. Be direct and confident.

ABOUT AMMI:
- Full name: Ammi Reddy Tetala
- Current role: Enterprise IT Manager at GEODIS (global 3PL company)
- Location: Franklin, TN (open to remote)
- Experience: 20+ years in enterprise IT
- Contact: ammitetala@gmail.com | +1 (925) 663-5429

CURRENT ROLE (GEODIS, 2019-Present):
- Leads 14-person global engineering team across US and India
- Manages IBM Sterling B2B Integrator (EDI/B2B), WMS (Manhattan Associates), IBM MQ messaging
- Onboarded 500+ trading partners across retail, grocery, automotive, pharmaceutical verticals
- Built AuthPortal: internal employee authentication system (MSAL, Azure AD, React)
- Engineered EDI automation reducing manual touchpoints by 70%

PREVIOUS EXPERIENCE:
- Levi Strauss & Co — IT Specialist (2016-2019): EDI integrations, B2B onboarding
- Cross Country Healthcare — Middleware Developer (2013-2016): IBM MQ, WebSphere
- Earlier roles in IBM WebSphere, middleware (2004 onwards)

KEY TECHNICAL SKILLS:
- Enterprise: IBM Sterling B2B Integrator, IBM MQ, WMS, EDI (X12, EDIFACT, AS2, SFTP)
- Cloud: GCP, Azure (Azure AD, MSAL), AWS basics
- AI/ML: LLMs, RAG pipelines, Gemini API, Python AI tooling, local model deployment
- Dev: React, TypeScript, Node.js, FastAPI, Python, SQL

AI PROJECTS:
- YouTube AI Automation: @ammiexplains has 1,670+ subscribers, 624K+ total views. Solo-built pipeline.
- Local AI Cluster: Deployed local LLM inference cluster
- AuthPortal: Enterprise IAM system built solo

AVAILABILITY: Open to Senior IT Manager, Enterprise Architect, AI Solutions Lead, VP of IT roles.
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'AI service not configured' });
  }

  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Missing message' });
  }

  // Rate-limit: simple check — message must be <= 500 chars
  if (message.length > 500) {
    return res.status(400).json({ error: 'Message too long' });
  }

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: RESUME_CONTEXT + '\n\nUser question: ' + message }],
            },
          ],
          generationConfig: { maxOutputTokens: 200 },
        }),
      }
    );

    const data = await geminiRes.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    if (!text) {
      return res.status(502).json({ error: 'No response from AI' });
    }

    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error('Gemini proxy error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
