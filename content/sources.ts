/**
 * Citations for every third-party and first-party figure on the page (spec §6.4, Appendix C).
 *
 * Third-party figures come from `spec/research/AI Spend Intelligence Market Analysis.pdf`, which
 * names publishers but not links. Before launch each primary source must be opened, quoted and
 * linked here (`url`, `quote`, `verified: true`). Until then the page renders the publisher name
 * without a link. First-party figures name the product spec section they come from and were
 * measured in October 2026; re-run the measurement before launch if the product has changed.
 */
export interface Source {
  id: string;
  /** The figure as it appears on the page */
  figure: string;
  publisher: string;
  title: string;
  url?: string;
  date?: string;
  /** The exact sentence from the source */
  quote?: string;
  /** Flip to true once the primary source has been opened and quoted */
  verified: boolean;
  /** Secondary outlet the research cited it through */
  via?: string;
  firstParty?: boolean;
  /** Product spec section for first-party figures */
  productSpecSection?: string;
}

export const sources = {
  gartnerGenAiSpend: {
    id: 'gartnerGenAiSpend',
    figure: '117% growth in worldwide spend on generative AI models in 2026, to $28.3B',
    publisher: 'Gartner',
    title: 'Gartner forecast of worldwide generative AI spending, 2026',
    via: 'Techstrong',
    verified: false,
  },
  harnessNoOwner: {
    id: 'harnessNoOwner',
    figure: '52% of practitioners say AI cost has no clear owner in their company',
    publisher: 'Harness',
    title: 'State of AI in FinOps 2026 (700 respondents)',
    date: '2026',
    verified: false,
  },
  finopsManageAiSpend: {
    id: 'finopsManageAiSpend',
    figure: '98% of FinOps teams now manage AI spend, up from 31% in 2024',
    publisher: 'FinOps Foundation',
    title: 'State of FinOps 2026',
    via: 'USU',
    date: '2026',
    verified: false,
  },
  harnessWeekToTrace: {
    id: 'harnessWeekToTrace',
    figure: 'Nearly a third of teams need a full week to trace a cost spike',
    publisher: 'Harness',
    title: 'State of AI in FinOps 2026',
    date: '2026',
    verified: false,
  },
  ripplingConcentration: {
    id: 'ripplingConcentration',
    figure: 'At Rippling, 10 to 15% of employees drove about 60% of AI spend',
    publisher: 'TechCrunch',
    title: 'Rippling AI spend concentration',
    via: 'AI Weekly',
    verified: false,
  },
  harnessWaste: {
    id: 'harnessWaste',
    figure: 'Practitioners estimate 26% of AI spend is wasted',
    publisher: 'Harness',
    title: 'State of AI in FinOps 2026',
    date: '2026',
    verified: false,
  },
  angellistCaching: {
    id: 'angellistCaching',
    figure: 'AngelList found a $10K-a-month leak from missing prompt caching',
    publisher: 'SiliconANGLE',
    title: 'AngelList prompt caching leak',
    verified: false,
  },
  uberBudget: {
    id: 'uberBudget',
    figure: 'Uber spent its 2026 AI coding budget in four months',
    publisher: 'TechStackups',
    title: 'Uber AI coding budget, 2026',
    verified: false,
  },
  /* Competitor-sourced figures, approved by Ben on Oct 13, 2026 (spec §17, question 9) */
  rampPayingForAi: {
    id: 'rampPayingForAi',
    figure: '56.1% of the 70,000+ US businesses on Ramp paid for AI in August 2026',
    publisher: 'Ramp',
    title: 'Ramp AI Index, August 2026',
    via: 'FRED',
    date: '2026-08',
    verified: false,
  },
  rampByIndustry: {
    id: 'rampByIndustry',
    figure: 'Finance and insurance firms 73.7%, information firms 80.9%, paying for AI on Ramp in August 2026',
    publisher: 'Ramp',
    title: 'Ramp AI Index, August 2026',
    via: 'FRED',
    date: '2026-08',
    verified: false,
  },
  /* First-party figures (spec §2.4, P17 and P18) */
  costMatchedClaudeCode: {
    id: 'costMatchedClaudeCode',
    figure: 'The cost recorded for real Claude Code sessions matched Claude Code’s own figure to seven decimal places',
    publisher: 'Ambiently',
    title: 'Measured accuracy on real Claude Code and Codex sessions',
    date: 'October 2026',
    quote: '$0.1028881 against $0.1028881; Codex token counts matched to the token',
    firstParty: true,
    productSpecSection: 'Implementation status, Verified so far',
    verified: false,
  },
  toolDefinitionsResent: {
    id: 'toolDefinitionsResent',
    figure: 'Behind a company endpoint, Claude Code can resend every tool definition on every call, about 14,500 extra tokens each time',
    publisher: 'Ambiently',
    title: 'Findings from real traffic',
    date: 'October 2026',
    quote: 'About 14,500 extra prompt tokens a call unless tool search is on; setup turns it on',
    firstParty: true,
    productSpecSection: 'Findings from real traffic',
    verified: false,
  },
} as const satisfies Record<string, Source>;

export type SourceId = keyof typeof sources;
