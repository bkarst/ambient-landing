/**
 * FAQ questions and answers (spec §6.11). Answers are plain strings: the FAQPage JSON-LD reuses
 * them word for word. Names come from `site`; the tool list in Q2 is generated from
 * `site.integrations` so adding an integration updates it.
 */
import { contextIntegrations, listNames, site, spendIntegrations } from '@/config/site';

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

const name = site.name;
const codingAgents = listNames(['Claude Code', 'Codex', 'Cursor', 'OpenCode']);
const spendNames = listNames(spendIntegrations.map((i) => i.name));
const contextNames = listNames(contextIntegrations.map((i) => i.name));

export const faq: FaqEntry[] = [
  {
    id: 'what-is',
    question: `What is ${name}?`,
    answer: `${name} is AI spend tracking. It records every AI request your teams make, ties it to the person, team and task behind it, and reconciles the total to your vendors' bills.`,
  },
  {
    id: 'which-tools',
    question: `Which tools does ${name} work with?`,
    answer: `Coding agents first: ${codingAgents}, with GitHub Copilot next. AI spend from ${spendNames}. Work context from ${contextNames}. More are on the way.`,
  },
  {
    id: 'vs-vendor-dashboards',
    question: 'How is this different from the usage dashboards my AI vendors provide?',
    answer: `Each vendor shows its own usage, by key or by seat. ${name} joins them, and goes a step further: it turns each AI session into a task, so you can see what a piece of work cost and whether it shipped.`,
  },
  {
    id: 'prompts',
    question: `Does ${name} read our prompts?`,
    answer: `It sees them as requests pass through, because that's how it tells which task a request belongs to. A small model writes each task's title and summary from a short digest, never the full transcript. Secrets are masked before anything is stored, raw content is encrypted and deleted after 30 days by default, and people see summaries rather than prompts unless their team chooses otherwise.`,
  },
  {
    id: 'monitoring',
    question: 'Is this employee monitoring?',
    answer: `No. ${name} is built to understand cost and progress, not to watch people. Teams see summaries rather than prompts, nobody is ranked on a leaderboard, and each person can see everything collected about their own work.`,
  },
  {
    id: 'latency',
    question: `Does ${name} slow down our AI tools?`,
    answer: `Not noticeably. Requests stream straight through to the vendor, and tracking happens after each one finishes, so it never holds one up. Prompt caching keeps working.`,
  },
  {
    id: 'setup',
    question: 'How long does setup take?',
    answer: `Minutes. Each person runs one command, or IT pushes the same settings to managed laptops. AI tools keep the sign-ins people already have, and work appears from the next session.`,
  },
  {
    id: 'where-it-runs',
    question: `Where does ${name} run?`,
    answer: `Where you choose: hosted by ${name}, or in your own cloud account, next to the AI tools it tracks.`,
  },
  {
    id: 'who-for',
    question: `Who is ${name} for?`,
    answer: `Finance, engineering and IT leaders at companies that spend anywhere from a few thousand to a few million dollars a month on AI.`,
  },
  {
    id: 'pricing',
    question: 'How much does it cost?',
    answer: `Pricing is set during early access. Tell us your company size and AI spend in the form and we'll share it.`, // [Verify]
  },
];
