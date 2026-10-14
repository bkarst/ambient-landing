/**
 * Every number on every chart and receipt on the page (spec Appendix B).
 *
 * Example Co. is a fictional 340-person software company. Sample "today" is 2026-09-30 and the
 * sample month is September 2026. All money is USD. Fixtures are static constants: no Date, no
 * Math.random, no functions inside `sampleData`, so the page prerenders and hydrates identically.
 * `derived` holds values computed from the fixtures (deltas, shares) so takeaways never drift.
 */
import type { IntegrationId } from '@/config/site';

export type TaskStatus = 'Planned' | 'In progress' | 'Tested' | 'Completed' | 'Deployed';
export type Tracker = 'jira' | 'monday' | 'notion';
export type ModelName = 'Claude Sonnet' | 'Claude Haiku' | 'Claude Opus' | 'GPT-5' | 'GPT-5 mini';

export interface ReceiptItem {
  taskKey?: string;
  title: string;
  tracker?: Tracker;
  vendor: IntegrationId;
  tool: string;
  team: string;
  /** Model family, or the unit the tool bills in ("Cursor usage", "625 credits") */
  model: string;
  tokensIn?: number;
  tokensOut?: number;
  /** Total tokens, raw (2_710_000) */
  tokens?: number;
  cost: number;
  status: TaskStatus;
}

export interface Point {
  label: string;
  value: number;
}

export interface TaskReceiptRow {
  taskKey?: string;
  title: string;
  tracker?: Tracker;
  team: string;
  /** "Claude Code (Claude Sonnet), Cursor" */
  modelOrTool: string;
  tokens?: number;
  cost: number;
  status: TaskStatus;
  /** Fixture-only breakdown so the cost is recomputable */
  makeup: { model?: ModelName; tokensIn?: number; tokensOut?: number; cursorUsage?: number; credits?: number };
}

export interface Alert {
  tone: 'negative' | 'neutral';
  badge: string;
  message: string;
  date: string;
}

/* ---------- fixture-only unit prices (never shown), per million tokens ---------- */
export const unitPrices: Record<ModelName, { in: number; out: number }> = {
  'Claude Sonnet': { in: 3, out: 15 },
  'Claude Haiku': { in: 1, out: 5 },
  'Claude Opus': { in: 5, out: 25 },
  'GPT-5': { in: 1.25, out: 10 },
  'GPT-5 mini': { in: 0.25, out: 2 },
};
export const CREDIT_PRICE = 0.01;
const M = 1_000_000;

export function costFromTokens(model: ModelName, tokensIn: number, tokensOut: number): number {
  const p = unitPrices[model];
  return round2((tokensIn / M) * p.in + (tokensOut / M) * p.out);
}

/* ---------- small pure helpers ---------- */
export function round(n: number, places = 0): number {
  const f = 10 ** places;
  return Math.round(n * f) / f;
}
export function round2(n: number): number {
  return round(n, 2);
}
export function sum(values: readonly number[]): number {
  return values.reduce((a, b) => a + b, 0);
}
/** Share of `part` in `whole`, in percent, rounded to one decimal */
export function pct(part: number, whole: number): number {
  return round((part / whole) * 100, 1);
}
/** Signed percentage change from `from` to `to`, one decimal */
export function delta(to: number, from: number): number {
  return round(((to - from) / from) * 100, 1);
}
export function cumulative(values: readonly number[]): number[] {
  const out: number[] = [];
  let acc = 0;
  for (const v of values) {
    acc += v;
    out.push(acc);
  }
  return out;
}

/* ---------- B.4 daily spend ---------- */
const septemberDaily = [
  3534, 3700, 3605, 4044, 4293, 4009, 3427, 3617, 4103, 4412, 4637, 4341, 3842, 3653, 4197, 4602, 4886, 4756, 4258, 3926,
  4483, 4934, 5242, 5076, 4590, 4293, 4756, 5206, 3760, 4218,
];
const augustDaily = [
  4454, 4361, 4533, 4680, 4799, 4627, 4281, 4374, 4573, 4733, 4906, 4799, 4494, 4387, 4586, 4759, 4919, 4853, 4520, 4427,
  4627, 4799, 4972, 4919, 4587, 4494, 4680, 4839, 4999, 4919,
];
const dayLabels = septemberDaily.map((_, i) => `Sep ${i + 1}`);
const augustLabels = augustDaily.map((_, i) => `Aug ${i + 1}`);

const SEPTEMBER_TOTAL = sum(septemberDaily); // 128,400
const AUGUST_TOTAL = sum(augustDaily); // 139,900
const TODAY = septemberDaily[29]; // 4,218
const YESTERDAY = septemberDaily[28]; // 3,760

/**
 * B.2 "Spend by token type": four 7-day blocks (Sep 3–9, 10–16, 17–23, 24–30) summed from the
 * daily series. Sep 1–2 ($7,234) falls outside the blocks. Output's share rises 62% → 65%.
 */
const tokenTypeWeeks = {
  labels: ['Sep 3–9', 'Sep 10–16', 'Sep 17–23', 'Sep 24–30'],
  output: [16801, 18701, 20790, 20734],
  input: [10297, 10983, 11695, 11165],
};

/**
 * "This quarter": 13 buckets, Jul 1 – Sep 30. The first nine cover July and August (seven days
 * each, the last one six days, ending Jul 7 … Aug 31). The four September buckets are Sep 1–9
 * (the two leading days folded into the first week), then 10–16, 17–23 and 24–30, so the
 * September buckets sum to the September total exactly. July and August bucket values were
 * hand-picked on the same gently rising weekly shape as August's daily series.
 */
const quarterWeeks = {
  labels: ['Jul 7', 'Jul 14', 'Jul 21', 'Jul 28', 'Aug 4', 'Aug 11', 'Aug 18', 'Aug 25', 'Aug 31', 'Sep 9', 'Sep 16', 'Sep 23', 'Sep 30'],
  values: [29400, 30100, 30900, 31600, 32300, 32800, 33100, 33400, 28600, 34332, 29684, 32485, 31899],
};

const last14 = septemberDaily.slice(16);
const FORECAST_OCTOBER = Math.round((sum(last14) / 14) * 31); // 142,565

/* ---------- B.3 lens ---------- */
const lens = {
  total: SEPTEMBER_TOTAL,
  vendor: [
    { label: 'Anthropic', value: 48200 },
    { label: 'OpenAI', value: 33400 },
    { label: 'Cursor', value: 23600 },
    { label: 'GitHub', value: 13600 },
    { label: 'Microsoft', value: 9600 },
  ] as Point[],
  model: [
    { label: 'Claude Sonnet', value: 39800 },
    { label: 'GPT-5', value: 27300 },
    { label: 'Seats (Copilot, Cursor)', value: 26100 },
    { label: 'Claude Opus', value: 18600 },
    { label: 'Claude Haiku', value: 8900 },
    { label: 'GPT-5 mini', value: 7700 },
  ] as Point[],
  team: [
    { label: 'Engineering', value: 71900 },
    { label: 'Product', value: 14100 },
    { label: 'Support', value: 12200 },
    { label: 'Marketing', value: 11600 },
    { label: 'Sales', value: 8300 },
    { label: 'Finance and ops', value: 6100 },
    { label: 'Legal', value: 4200 },
  ] as Point[],
  task: [
    { label: 'Code generation and features', value: 38500 },
    { label: 'Code review', value: 21800 },
    { label: 'Bug fixes', value: 17900 },
    { label: 'Customer replies', value: 12600 },
    { label: 'Documentation', value: 10300 },
    { label: 'Research and analysis', value: 9800 },
    { label: 'Sales and marketing content', value: 8700 },
    { label: 'Meeting notes and summaries', value: 4100 },
    { label: 'Not linked to a task', value: 4700 },
  ] as Point[],
};

/* ---------- B.1 hero receipt ---------- */
const receiptItems: ReceiptItem[] = [
  {
    taskKey: 'ENG-1423',
    title: 'Refactor billing service',
    tracker: 'jira',
    vendor: 'anthropic',
    tool: 'Claude Code',
    team: 'Engineering',
    model: 'Claude Sonnet',
    tokensIn: 2_400_000,
    tokensOut: 310_000,
    tokens: 2_710_000,
    cost: 11.85,
    status: 'Tested',
  },
  {
    taskKey: 'MKT-208',
    title: 'Write Q4 launch brief',
    tracker: 'monday',
    vendor: 'openai',
    tool: 'OpenAI API',
    team: 'Marketing',
    model: 'GPT-5',
    tokensIn: 520_000,
    tokensOut: 120_000,
    tokens: 640_000,
    cost: 1.85,
    status: 'In progress',
  },
  {
    title: 'Refresh support macros',
    tracker: 'notion',
    vendor: 'anthropic',
    tool: 'Claude API',
    team: 'Support',
    model: 'Claude Haiku',
    tokensIn: 1_900_000,
    tokensOut: 400_000,
    tokens: 2_300_000,
    cost: 3.9,
    status: 'In progress',
  },
  {
    taskKey: 'ENG-1388',
    title: 'Fix flaky checkout tests',
    tracker: 'jira',
    vendor: 'cursor',
    tool: 'Cursor',
    team: 'Engineering',
    model: 'Cursor usage',
    cost: 46.2,
    status: 'Deployed',
  },
  {
    title: 'Summarize release pull requests',
    vendor: 'github',
    tool: 'GitHub Copilot',
    team: 'Engineering',
    model: 'Copilot premium requests',
    cost: 18.4,
    status: 'Completed',
  },
  {
    title: 'Review vendor contract',
    vendor: 'microsoft',
    tool: 'Microsoft Copilot',
    team: 'Legal',
    model: '625 credits',
    cost: 6.25,
    status: 'In progress',
  },
];

/* ---------- B.6 task receipts (month to date) ---------- */
const taskReceipts: TaskReceiptRow[] = [
  {
    taskKey: 'ENG-1423',
    title: 'Refactor billing service',
    tracker: 'jira',
    team: 'Engineering',
    modelOrTool: 'Claude Code (Claude Sonnet), Cursor',
    tokens: 41_200_000,
    cost: 612.4,
    status: 'Tested',
    makeup: { model: 'Claude Sonnet', tokensIn: 36_000_000, tokensOut: 5_200_000, cursorUsage: 426.4 },
  },
  {
    taskKey: 'ENG-1388',
    title: 'Fix flaky checkout tests',
    tracker: 'jira',
    team: 'Engineering',
    modelOrTool: 'Cursor',
    cost: 138.2,
    status: 'Deployed',
    makeup: { cursorUsage: 138.2 },
  },
  {
    taskKey: 'MKT-208',
    title: 'Write Q4 launch brief',
    tracker: 'monday',
    team: 'Marketing',
    modelOrTool: 'OpenAI API (GPT-5)',
    tokens: 6_800_000,
    cost: 19,
    status: 'In progress',
    makeup: { model: 'GPT-5', tokensIn: 5_600_000, tokensOut: 1_200_000 },
  },
  {
    title: 'Refresh customer FAQ',
    tracker: 'notion',
    team: 'Support',
    modelOrTool: 'Claude API (Claude Haiku)',
    tokens: 9_400_000,
    cost: 15.8,
    status: 'In progress',
    makeup: { model: 'Claude Haiku', tokensIn: 7_800_000, tokensOut: 1_600_000 },
  },
  {
    title: 'Draft September board update',
    tracker: 'notion',
    team: 'Finance and ops',
    modelOrTool: 'Microsoft Copilot',
    cost: 30,
    status: 'In progress',
    makeup: { credits: 3000 },
  },
];

/* ---------- B.7 teams ---------- */
const activeUsersWeekly = [212, 228, 236, 251, 263, 270, 284, 291];
const ACTIVE_USERS = activeUsersWeekly[7]; // 291
const AUGUST_ACTIVE_USERS = 280;
const ENGINEERING_ACTIVE_USERS = 90;
const EMPLOYEES = 340;

/* ---------- B.8 waste ---------- */
const mostExpensiveTasks = [
  { taskKey: 'ENG-1297', title: 'Migrate search to the new index', team: 'Engineering', cost: 1840 },
  { taskKey: 'ENG-1310', title: 'Rebuild onboarding flow', team: 'Engineering', cost: 1420 },
  { taskKey: 'SUP-77', title: 'Answer the September ticket backlog', team: 'Support', cost: 980 },
  { taskKey: 'ENG-1423', title: 'Refactor billing service', team: 'Engineering', cost: 612.4 },
  { taskKey: 'ENG-1352', title: 'Add usage-based invoicing', team: 'Engineering', cost: 590 },
];
/** Prompt tokens and tokens served from cache, in millions. Tools that report only totals are left out. */
const cacheByTool = [
  { tool: 'Claude Code', promptTokens: 7400, cachedTokens: 4070 },
  { tool: 'Codex', promptTokens: 4600, cachedTokens: 1840 },
  { tool: 'Claude API', promptTokens: 3000, cachedTokens: 840 },
  { tool: 'OpenAI API', promptTokens: 1800, cachedTokens: 180 },
];

/* ---------- B.9 budgets ---------- */
const BUDGET = 140000;
const budgetLine = septemberDaily.map((_, i) => Math.round((BUDGET * (i + 1)) / 30));
const cumulativeSpend = cumulative(septemberDaily);
const alerts: Alert[] = [
  { tone: 'negative', badge: 'Over 90%', message: 'Engineering passed 90% of its September budget.', date: 'Sep 24' },
  { tone: 'neutral', badge: 'Spike', message: 'Cursor spend rose 38% week over week.', date: 'Sep 18' },
  { tone: 'neutral', badge: 'Variance', message: "OpenAI's August bill was 5.4% over the estimate. Totals now match the bill.", date: 'Sep 3' },
];

/* ---------- B.2 product shot ---------- */
const TOKENS_TODAY = 684 * M;
const TOKENS_YESTERDAY = 627 * M;
const hourlyTokens = [
  14.7, 13.6, 12.5, 11.8, 11.5, 12.2, 15.0, 21.8, 30.1, 36.5, 42.2, 44.4, 43.3, 45.1, 46.8, 46.2, 43.7, 40.8, 35.1, 30.8,
  27.2, 22.9, 19.3, 16.5,
].map((v) => Math.round(v * M));
const hourLabels = hourlyTokens.map((_, h) => `${String(h).padStart(2, '0')}:00`);

/* ---------- derived values (computed, never typed) ---------- */
const topOf = (points: Point[], n: number) => points.slice(0, n);
const outputLast = tokenTypeWeeks.output[3];
const inputLast = tokenTypeWeeks.input[3];
const gaps = tokenTypeWeeks.output.map((o, i) => o - tokenTypeWeeks.input[i]);
const cacheTotals = {
  promptTokens: sum(cacheByTool.map((t) => t.promptTokens)),
  cachedTokens: sum(cacheByTool.map((t) => t.cachedTokens)),
};

export const derived = {
  septemberTotal: SEPTEMBER_TOTAL,
  augustTotal: AUGUST_TOTAL,
  monthDelta: delta(SEPTEMBER_TOTAL, AUGUST_TOTAL), // -8.2
  dayDelta: delta(TODAY, YESTERDAY), // 12.2
  tokensDelta: delta(TOKENS_TODAY, TOKENS_YESTERDAY), // 9.1
  activeUsersDelta: delta(ACTIVE_USERS, activeUsersWeekly[6]), // 2.5
  activeUsersShare: Math.round(pct(ACTIVE_USERS, EMPLOYEES)), // 86
  forecastOctober: FORECAST_OCTOBER, // 142,565
  budgetUsed: pct(SEPTEMBER_TOTAL, BUDGET), // 91.7
  budgetUsedRounded: Math.round(pct(SEPTEMBER_TOTAL, BUDGET)), // 92
  lens: {
    anthropicAndOpenAI: Math.round(pct(lens.vendor[0].value + lens.vendor[1].value, SEPTEMBER_TOTAL)), // 64
    seats: pct(lens.model[2].value, SEPTEMBER_TOTAL), // 20.3
    seatsRounded: Math.round(pct(lens.model[2].value, SEPTEMBER_TOTAL)), // 20 → "a fifth"
    engineering: Math.round(pct(lens.team[0].value, SEPTEMBER_TOTAL)), // 56
    codeWork: Math.round(pct(lens.task[0].value + lens.task[1].value + lens.task[2].value, SEPTEMBER_TOTAL)), // 61
    notLinked: Math.round(pct(lens.task[lens.task.length - 1].value, SEPTEMBER_TOTAL)), // 4
    reviewAndBugs: Math.round(pct(lens.task[1].value + lens.task[2].value, SEPTEMBER_TOTAL)), // 31
  },
  tokenType: {
    outputToInputRatio: round(outputLast / inputLast, 2), // 1.86
    gapFirst: gaps[0], // 6,504
    gapLast: gaps[3], // 9,569
    gapWidening: gaps.every((g, i) => i === 0 || g >= gaps[i - 1]),
    outputShareFirst: Math.round(pct(tokenTypeWeeks.output[0], tokenTypeWeeks.output[0] + tokenTypeWeeks.input[0])), // 62
    outputShareLast: Math.round(pct(outputLast, outputLast + inputLast)), // 65
  },
  teams: {
    costPerActiveUser: round2(SEPTEMBER_TOTAL / ACTIVE_USERS), // 441.24
    costPerActiveUserAugust: round2(AUGUST_TOTAL / AUGUST_ACTIVE_USERS), // 499.64
    costPerActiveUserDelta: delta(SEPTEMBER_TOTAL / ACTIVE_USERS, AUGUST_TOTAL / AUGUST_ACTIVE_USERS), // -11.7
    engineeringActiveShare: Math.round(pct(ENGINEERING_ACTIVE_USERS, ACTIVE_USERS)), // 31
  },
  waste: {
    mostExpensiveTotal: round2(sum(mostExpensiveTasks.map((t) => t.cost))), // 5,442.40
    mostExpensiveShare: pct(sum(mostExpensiveTasks.map((t) => t.cost)), SEPTEMBER_TOTAL), // 4.2
    cacheHitByTool: cacheByTool.map((t) => ({ tool: t.tool, hitRate: Math.round(pct(t.cachedTokens, t.promptTokens)) })), // 55, 40, 28, 10
    cacheHitOverall: pct(cacheTotals.cachedTokens, cacheTotals.promptTokens), // 41.3
    cacheHitOverallRounded: Math.round(pct(cacheTotals.cachedTokens, cacheTotals.promptTokens)), // 41
  },
} as const;

export const sampleData = {
  today: '2026-09-30',
  month: 'September',
  previousMonth: 'August',
  company: { name: 'Example Co.', employees: EMPLOYEES },

  receipt: {
    items: receiptItems,
    moreLineItems: 1284,
    totalToday: TODAY,
    yesterday: YESTERDAY,
  },

  daily: {
    labels: dayLabels,
    september: septemberDaily,
    august: augustDaily,
    augustLabels,
    ranges: {
      last7: { labels: dayLabels.slice(-7), september: septemberDaily.slice(-7), august: augustDaily.slice(-7) },
      last30: { labels: dayLabels, september: septemberDaily, august: augustDaily },
      quarter: quarterWeeks,
    },
  },

  dashboard: {
    stats: {
      spendThisMonth: { value: SEPTEMBER_TOTAL, delta: derived.monthDelta, period: 'vs August', caption: 'Reconciled through Sep 29. Today is estimated.' },
      spendToday: { value: TODAY, delta: derived.dayDelta, period: 'vs yesterday', trend: septemberDaily.slice(-12) },
      tokensToday: { value: TOKENS_TODAY, previous: TOKENS_YESTERDAY, delta: derived.tokensDelta, period: 'vs yesterday' },
      activeUsers: { value: ACTIVE_USERS, previous: activeUsersWeekly[6], delta: derived.activeUsersDelta, period: 'vs last week', caption: `${derived.activeUsersShare}% of employees` },
    },
    tokenType: tokenTypeWeeks,
    topModels: topOf(lens.model.filter((m) => !m.label.startsWith('Seats')), 4),
    hourly: { labels: hourLabels, values: hourlyTokens, total: TOKENS_TODAY },
    health: { budgetUsed: derived.budgetUsedRounded, cacheHit: derived.waste.cacheHitOverallRounded },
  },

  lens,

  chapters: {
    spendOverTime: {
      spendInSeptember: { value: SEPTEMBER_TOTAL, delta: derived.monthDelta, period: 'vs August' },
      forecastOctober: { value: FORECAST_OCTOBER, budget: BUDGET },
    },
    vendorsModels: {
      topModels: topOf(lens.model.filter((m) => !m.label.startsWith('Seats')), 5),
      tokenType: tokenTypeWeeks,
    },
    tasks: {
      byTaskType: lens.task,
      receipts: taskReceipts,
    },
    teams: {
      byTeam: lens.team,
      concentration: { share: 58, topUsersShare: 12 },
      activeUsers: { labels: ['W31', 'W32', 'W33', 'W34', 'W35', 'W36', 'W37', 'W38'], values: activeUsersWeekly },
      costPerActiveUser: { value: derived.teams.costPerActiveUser, delta: derived.teams.costPerActiveUserDelta, period: 'vs August' },
      engineeringActiveUsers: ENGINEERING_ACTIVE_USERS,
    },
    waste: {
      mostExpensiveTasks,
      cacheByTool,
      cacheHitOverall: derived.waste.cacheHitOverallRounded,
    },
    budgets: {
      budget: BUDGET,
      labels: dayLabels,
      cumulativeSpend,
      budgetLine,
      budgetUsed: derived.budgetUsedRounded,
      alerts,
    },
  },
} as const;

export type SampleData = typeof sampleData;
