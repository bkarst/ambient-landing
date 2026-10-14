/**
 * Section-level copy for the landing page (spec §6). Plain strings only; components never
 * assemble sentences from fragments. Names come from `site`, never retyped.
 */
import { site, integrationNames, listNames } from '@/config/site';
import type { IconName } from '@/components/ds/icons';

const name = site.name;

export const landing = {
  skipLink: 'Skip to content',
  appearance: { toLight: 'Switch to light appearance', toDark: 'Switch to dark appearance' },

  hero: {
    eyebrow: 'AI SPEND TRACKING',
    headline: site.taglines.hero,
    lede: `${name} itemizes every AI token your company buys and ties it to the person, the model and the task it paid for. Nobody has to tag anything.`,
    primary: site.cta.primary,
    secondary: site.cta.secondary,
    microcopy: 'Four fields, two of them optional. Takes under a minute.',
    receipt: {
      title: 'My Example Project',
      subtitle: 'Today · Example Co.',
      live: 'Live',
      totalLabel: 'Total today',
      deltaPeriod: 'vs yesterday',
      sample: 'Sample data',
    },
  },

  integrations: {
    heading: 'Receipts from the tools your teams already use.',
    caption: `${integrationNames}.`,
    pause: 'Pause logos',
    play: 'Play logos',
  },

  why: {
    overline: 'WHY RECEIPTS',
    heading: 'AI spend grows faster than anyone can explain it.',
    body: "Usage-based AI is now one of the fastest-growing costs in many companies. The bills arrive as totals. Finance can't see who or what drove them, and teams can't see what their work cost.",
    figures: [
      { value: 117, suffix: '%', sentence: 'growth in worldwide spend on generative AI models in 2026, to $28.3B.', sourceId: 'gartnerGenAiSpend' },
      { value: 52, suffix: '%', sentence: 'of practitioners say AI cost has no clear owner in their company.', sourceId: 'harnessNoOwner' },
      { value: 98, suffix: '%', sentence: 'of FinOps teams now manage AI spend, up from 31% in 2024.', sourceId: 'finopsManageAiSpend' },
    ],
  },

  dashboards: {
    overline: 'DASHBOARDS',
    heading: 'Every AI token, itemized.',
    body: "One view across every AI vendor. Spend by day, by model, by team and by task, each number compared with the last period and reconciled to the vendor's bill.",
    shot: {
      title: 'Insights',
      caption: 'AI spend across 8 sources, Example Co., September',
      rangeLabel: 'Time range',
      exportLabel: 'Export',
      exportTip: 'CSV or FOCUS, in the product',
      nav: [
        { id: 'home', label: 'Home', icon: 'overview' as IconName, badge: 3 },
        { id: 'board', label: 'Board', icon: 'data' as IconName },
        { id: 'planning', label: 'Planning', icon: 'calendar' as IconName },
        { id: 'insights', label: 'Insights', icon: 'telemetry' as IconName },
        { id: 'setup', label: 'Setup', icon: 'connect' as IconName },
        { section: 'Workspace' },
        { id: 'settings', label: 'Settings', icon: 'settings' as IconName },
      ],
      navLabel: 'Product navigation',
      live: 'All sources live',
      tiles: {
        spendMonth: { label: 'Spend this month', period: 'vs August', caption: 'Reconciled through Sep 29. Today is estimated.' },
        spendToday: { label: 'Spend today', period: 'vs yesterday' },
        tokensToday: { label: 'Tokens today', period: 'vs yesterday' },
        activeUsers: { label: 'Active users', period: 'vs last week', caption: '86% of employees' },
      },
      cards: {
        daily: { title: 'Daily spend', subtitle: 'September compared with August, USD', series: ['September', 'August'] },
        tokenType: { title: 'Spend by token type', subtitle: 'September, by week, USD', series: ['Output', 'Input'] },
        topModels: { title: 'Top models by spend', subtitle: 'September, USD', series: 'Spend' },
        hourly: { title: 'Tokens by hour', subtitle: 'Today', series: 'Tokens' },
        health: { title: 'Health', subtitle: 'September', budget: 'Budget used', cache: 'Cache hit rate' },
      },
      sample: 'Sample data',
      sampleCaption: 'Illustrative data for Example Co., a 340-person company.',
    },
  },

  lens: {
    overline: 'RECEIPTS, NOT TOTALS',
    heading: 'One invoice. Four ways to read it.',
    body: `Your AI vendors send a total. ${name} splits the same $128,400 by vendor, by model, by team and by task, so every dollar has an owner and a reason.`,
    totalLabel: 'September AI spend',
    pickerLabel: 'Read the invoice',
    chartTitle: 'September AI spend',
    lenses: [
      { id: 'vendor', label: 'By vendor', takeaway: 'Anthropic and OpenAI are 64% of the bill.' },
      { id: 'model', label: 'By model', takeaway: 'Seats are a fifth of the bill. The rest is metered usage.' },
      { id: 'team', label: 'By team', takeaway: 'Engineering is 56% of spend.' },
      { id: 'task', label: 'By task', takeaway: "Code work is 61% of spend, and 4% isn't linked to a task yet." },
    ],
    value: 'Vendor totals tell you what to pay. Receipts tell you whether it was worth paying.',
    sample: 'Sample data',
  },

  chapters: {
    sample: 'Sample data',
    spendOverTime: {
      id: 'spend-over-time',
      overline: 'SPEND OVER TIME',
      heading: 'Know the total before the invoice does.',
      why: `AI bills arrive once a month as a single number. ${name} shows spend every day, against last month and against budget, so a spike becomes a Tuesday conversation instead of a month-end surprise.`,
      bullets: [
        { icon: 'calendar' as IconName, text: 'Spend today, this month and forecast to month end.' },
        { icon: 'arrow-up-right' as IconName, text: 'Every number compared with the last period.' },
        { icon: 'check' as IconName, text: "Estimates reconciled to each vendor's bill every day, so the numbers match the invoice." },
      ],
      proof: { text: 'Nearly a third of teams need a full week to trace a cost spike.', sourceId: 'harnessWeekToTrace' },
      cards: {
        daily: { title: 'Daily spend', subtitle: 'September compared with August, USD', series: ['September', 'August'], rangeLabel: 'Time range' },
        spendMonth: { label: 'Spend in September', period: 'vs August' },
        forecast: { label: 'Forecast, October', caption: 'At current pace, over the $140K budget' },
      },
      takeaway: 'September came in 8% under August despite a late-month rise.',
    },
    vendorsModels: {
      id: 'vendors-and-models',
      overline: 'VENDORS AND MODELS',
      heading: 'See every vendor and model on one ledger.',
      why: `Each vendor's console shows its own slice. ${name} puts ${listNames(['Anthropic', 'OpenAI', 'Cursor', 'GitHub', 'Microsoft'])} on one ledger, broken down by model, tool and token type, so you can see what each model costs for the work it does.`,
      bullets: [
        { icon: 'model' as IconName, text: 'Spend by vendor, model, tool and token type.' },
        { icon: 'spend' as IconName, text: 'Plan seats and metered usage side by side, with plan usage valued at list price.' },
        { icon: 'filter' as IconName, text: 'The most expensive tasks, and the model behind each one.' },
      ],
      proof: { text: `In testing, the cost ${name} recorded for real Claude Code sessions matched Claude Code's own figure to seven decimal places.`, sourceId: 'costMatchedClaudeCode' },
      cards: {
        topModels: { title: 'Top models by spend', subtitle: 'September, USD', series: 'Spend' },
        tokenType: { title: 'Spend by token type', subtitle: 'September, by week, USD', series: ['Output', 'Input'] },
      },
      takeaway: 'Output tokens cost nearly twice what input does, and the gap is growing.',
    },
    tasks: {
      id: 'tasks',
      overline: 'TASKS',
      heading: 'Tie every token to a task.',
      why: `A seat count says who has access. A receipt says what the money did. ${name} turns every AI session into a task with a title, a status and a cost, without anyone tagging anything, and links it to its ticket in Jira, monday.com or Notion. So you can see what a feature, a fix or a launch cost in AI, and whether it shipped.`,
      bullets: [
        { icon: 'data' as IconName, text: 'Every session becomes a task, titled and costed automatically.' },
        { icon: 'check' as IconName, text: 'Status from evidence: tests passed, PR opened, deployed.' },
        { icon: 'info' as IconName, text: 'Spend not linked to a task yet is shown, not hidden.' },
      ],
      cards: {
        taskType: { title: 'Spend by task type', subtitle: 'September, USD', series: 'Spend' },
        receipts: {
          title: 'Task receipts',
          subtitle: 'September, month to date',
          caption: 'Task receipts for September, month to date, with tracker, team, model or tool, tokens, cost and status.',
          columns: { task: 'Task', tracker: 'Tracker', team: 'Team', model: 'Model or tool', tokens: 'Tokens', cost: 'Cost', status: 'Status' },
        },
      },
      takeaway: 'Code review and bug fixes are 31% of spend.',
    },
    teams: {
      id: 'teams',
      overline: 'TEAMS',
      heading: 'See which teams drive the spend.',
      why: `In most companies a small group drives most of the spend, and that's often good news. ${name} shows the pattern by team, counting spend for the team whose work it was rather than whoever's key paid, so you can invest where AI pays off and coach where it doesn't.`,
      bullets: [
        { icon: 'people' as IconName, text: 'Spend and active users by team.' },
        { icon: 'spend' as IconName, text: 'Cost per active user, month over month.' },
        { icon: 'security' as IconName, text: 'No leaderboards. Each person sees their own usage, and admins see it only if your company turns that on.' },
      ],
      proof: { text: 'At Rippling, 10 to 15% of employees drove about 60% of AI spend.', sourceId: 'ripplingConcentration' },
      cards: {
        byTeam: { title: 'Spend by team', subtitle: 'September, USD', series: 'Spend' },
        concentration: { title: 'Concentration', subtitle: 'September', ringLabel: 'of spend from the top 12% of users' },
        active: { title: 'Active AI users', subtitle: 'Weekly, last 8 weeks', series: 'Active users', stat: { label: 'Cost per active user', period: 'vs August' } },
      },
      takeaway: 'Engineering is 56% of spend with 31% of active users.',
    },
    waste: {
      id: 'waste',
      overline: 'WASTE',
      heading: 'Find the waste.',
      why: `Some spend buys nothing: prompts that could have been cached, a large model doing a small model's job, a tool resending the same context on every call. ${name} records the tokens behind every request, cache reads and writes included, so the waste shows up next to the work that caused it.`,
      bullets: [
        { icon: 'data' as IconName, text: 'The ten most expensive tasks, one click from the sessions behind them.' },
        { icon: 'storage' as IconName, text: 'Cache reads and writes on every request, by tool and model.' },
        { icon: 'model' as IconName, text: `${name}'s own model use on its own line, capped at 2% of your spend.` },
      ],
      proofs: [
        { text: 'Practitioners estimate 26% of AI spend is wasted.', sourceId: 'harnessWaste' },
        { text: 'AngelList found a $10K-a-month leak from missing prompt caching.', sourceId: 'angellistCaching' },
        { text: `Behind a company endpoint, Claude Code can resend every tool definition on every call, about 14,500 extra tokens each time. ${name}'s setup switches that off.`, sourceId: 'toolDefinitionsResent' },
      ],
      cards: {
        expensive: { title: 'Most expensive tasks', subtitle: 'September, month to date, USD', series: 'Cost' },
        cacheByTool: { title: 'Cache hit rate by tool', subtitle: 'September, share of prompt tokens served from cache', series: 'Hit rate' },
        cacheRing: { label: 'Cache hit rate', caption: 'All tools, September' },
      },
      takeaway: 'Claude Code serves 55% of its prompt tokens from cache. The OpenAI API serves 10%.',
    },
    budgets: {
      id: 'budgets',
      overline: 'BUDGETS',
      heading: 'Get warned before the budget runs out.',
      why: `Set a budget for each team. ${name} forecasts the month from the current pace, on reconciled cost, and alerts you while there's still time to act.`,
      bullets: [
        { icon: 'spend' as IconName, text: 'A budget for every team, on reconciled cost.' },
        { icon: 'clock' as IconName, text: 'Forecast to month end from current pace.' },
        { icon: 'alerts' as IconName, text: 'Alerts by email or Slack when a team is on pace to go over.' },
      ],
      proof: { text: 'Uber spent its 2026 AI coding budget in four months.', sourceId: 'uberBudget' },
      cards: {
        budget: { title: 'Spend against budget', subtitle: 'September, cumulative, USD', series: ['Spend, cumulative', 'Budget'] },
        ring: { label: 'Budget used' },
        alerts: { title: 'Alerts', subtitle: 'September' },
      },
      takeaway: 'On pace, September closes at 92% of budget. Engineering crossed 90% on the 24th.',
    },
  },

  howItWorks: {
    overline: 'HOW IT WORKS',
    heading: 'Connect once. Receipts from then on.',
    steps: [
      {
        number: '01',
        icon: 'connect' as IconName,
        title: 'Connect',
        body: `Each person runs one command, or IT pushes it to managed laptops. From the next session, Claude Code, Codex and Cursor report to ${name} on the sign-ins people already have. Connect your vendors' billing and your work tools once.`,
      },
      {
        number: '02',
        icon: 'telemetry' as IconName,
        title: 'Attribute',
        body: `${name} matches every request to a person, a team and a task, and prices it. Each task gets a title and a status from evidence: tests passed, PR opened, deployed. Nobody tags anything.`,
      },
      {
        number: '03',
        icon: 'check' as IconName,
        title: 'Reconcile',
        body: "Estimates are reconciled to each vendor's bill every day. Set budgets, get alerts and export to finance as CSV or FOCUS.",
      },
    ],
    footnote: 'Tracking never holds up a request, and your AI tools keep their own sign-ins.',
    diagram: {
      spendHeading: 'Where tokens are spent',
      contextHeading: 'Where work is tracked',
      ariaLabel: `Diagram: ${listNames(site.integrations.filter((i) => (i.roles as readonly string[]).includes('spend')).map((i) => i.name))} send AI spend to ${name}, which links it to work tracked in ${listNames(site.integrations.filter((i) => (i.roles as readonly string[]).includes('context')).map((i) => i.name))}.`,
    },
  },

  trust: {
    overline: 'PRIVACY',
    heading: 'Quiet by design.',
    lede: `${name} sees AI requests so it can tell what they were for. It shows people what they need, keeps the rest locked away, and never gets in the way of the work.`,
    points: [
      { icon: 'security' as IconName, title: 'Summaries, not prompts.', body: 'Teams see what each task did, not what was typed. Prompts stay hidden unless a team chooses to show them, and every view is logged.' },
      { icon: 'storage' as IconName, title: 'Secrets masked, content expires.', body: 'Keys, tokens and passwords are masked before anything is stored. Raw content is encrypted and deleted after 30 days, or never kept at all.' },
      { icon: 'cloud' as IconName, title: 'Hosted or in your cloud.', body: `Use ${name} hosted, or deploy it in your own cloud account, next to the AI tools it tracks.` },
      { icon: 'connect' as IconName, title: 'Never in the way.', body: 'Tracking never holds up a request. If tracking stops, your AI tools keep working.' },
    ],
  },

  whatsNext: {
    overline: "WHAT'S NEXT",
    heading: 'Coming next.',
    lede: 'Receipts are the start. These are next on the plan. None of them ships yet.',
    badge: 'Planned',
    items: [
      { icon: 'storage' as IconName, title: 'Savings with a figure on each fix.', body: 'Prompt caching gaps, idle seats across Cursor, GitHub Copilot and Microsoft Copilot, and the monthly saving from fixing each one.' },
      { icon: 'model' as IconName, title: 'Models matched to the work.', body: "Where a large model is doing a small model's job, and what the right model would have cost." },
      { icon: 'spend' as IconName, title: 'Budgets by vendor and project.', body: 'Budgets on more than teams, with alerts at the thresholds you choose.' },
      { icon: 'alerts' as IconName, title: 'Alerts that name the fix.', body: 'Not just a spike, but what to do about it: prompt caching is off for three Anthropic keys, and here is what turning it on saves.' },
    ],
    captionLink: 'Tell us which of these matters to you.',
  },

  faq: {
    overline: 'FAQ',
    heading: 'Questions and answers.',
  },

  form: {
    overline: 'EARLY ACCESS',
    heading: 'Get your first receipts.',
    body: 'Tell us a little about what you want to see. Company size and spend are optional, and they help us reply with something useful.',
    fields: {
      email: { label: 'Work email', placeholder: 'name@company.com' },
      message: {
        label: 'What do you want to know about your AI spend?',
        hint: 'A sentence or two is plenty.',
        placeholder: 'For example: which teams use Cursor the most, and what it costs per sprint.',
        countAfter: 800,
        max: 1000,
      },
      companySize: {
        label: 'Company size',
        optional: '(optional)',
        placeholder: 'Choose…',
        options: [
          { value: '1-19', label: '1–19 employees' },
          { value: '20-49', label: '20–49' },
          { value: '50-199', label: '50–199' },
          { value: '200-499', label: '200–499' },
          { value: '500-999', label: '500–999' },
          { value: '1000-4999', label: '1,000–4,999' },
          { value: '5000+', label: '5,000 or more' },
        ],
      },
      monthlyAiSpend: {
        label: 'Monthly AI spend',
        optional: '(optional)',
        placeholder: 'Choose…',
        options: [
          { value: 'under-1k', label: 'Under $1K' },
          { value: '1k-5k', label: '$1K–$5K' },
          { value: '5k-25k', label: '$5K–$25K' },
          { value: '25k-100k', label: '$25K–$100K' },
          { value: '100k-500k', label: '$100K–$500K' },
          { value: '500k+', label: '$500K or more' },
          { value: 'not-sure', label: 'Not sure yet' },
        ],
      },
    },
    submit: 'Request access',
    submitting: 'Sending…',
    privacyNote: 'We use your answers only to reply to you.',
    privacyLink: 'Privacy policy',
    success: { heading: 'Thanks. Your request is in.', body: "We'll reply to" },
    errors: {
      summary: 'Check the fields below.',
      emailMissing: 'Enter your work email.',
      emailInvalid: 'Enter an email address like name@company.com.',
      messageMissing: 'Tell us a little about what you want to see.',
      messageShort: 'Add a few more words so we can help.',
      messageLong: 'Keep it under 1,000 characters.',
      rateLimited: 'Too many requests from this network. Try again in a few minutes.',
      server: 'Something went wrong on our side. Your answers are still here, so try again in a moment.',
    },
  },

  footer: {
    tagline: site.taglines.footer,
    answer: `${name} can tell you.`,
    cta: site.cta.primary.label,
    heading: 'Site footer',
    groups: {
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
    },
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    trademarks: `${integrationNames} are trademarks of their respective owners. Their use here identifies integrations and does not imply endorsement.`,
  },
} as const;

export type Landing = typeof landing;
