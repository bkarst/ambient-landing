import { describe, expect, it } from 'vitest';
import { CREDIT_PRICE, costFromTokens, derived, sampleData, sum } from '@/content/sample-data';

const TOTAL = 128_400;

describe('lens', () => {
  it('every lens sums to the September total', () => {
    expect(sampleData.lens.total).toBe(TOTAL);
    for (const key of ['vendor', 'model', 'team', 'task'] as const) {
      expect(sum(sampleData.lens[key].map((p) => p.value))).toBe(TOTAL);
    }
  });
  it('is ranked biggest first, with the residual last in the task lens', () => {
    for (const key of ['vendor', 'model', 'team'] as const) {
      const values = sampleData.lens[key].map((p) => p.value);
      expect([...values].sort((a, b) => b - a)).toEqual(values);
    }
    const task = sampleData.lens.task;
    expect(task[task.length - 1].label).toBe('Not linked to a task');
    const ranked = task.slice(0, -1).map((p) => p.value);
    expect([...ranked].sort((a, b) => b - a)).toEqual(ranked);
  });
  it('takeaways compute to the strings in the copy', () => {
    expect(derived.lens.anthropicAndOpenAI).toBe(64);
    expect(derived.lens.seats).toBe(20.3);
    expect(derived.lens.seatsRounded).toBe(20);
    expect(derived.lens.engineering).toBe(56);
    expect(derived.lens.codeWork).toBe(61);
    expect(derived.lens.notLinked).toBe(4);
    expect(derived.lens.reviewAndBugs).toBe(31);
  });
});

describe('hero receipt', () => {
  it('line items recompute from the unit prices', () => {
    for (const item of sampleData.receipt.items) {
      if (item.tokensIn != null && item.tokensOut != null) {
        expect(costFromTokens(item.model as never, item.tokensIn, item.tokensOut)).toBe(item.cost);
        expect(item.tokensIn + item.tokensOut).toBe(item.tokens);
      }
    }
    const credits = sampleData.receipt.items.find((i) => i.model.endsWith('credits'))!;
    expect(parseInt(credits.model, 10) * CREDIT_PRICE).toBeCloseTo(credits.cost, 2);
  });
  it('total today is the last day of the fixture, with the delta vs yesterday', () => {
    expect(sampleData.receipt.totalToday).toBe(4218);
    expect(sampleData.receipt.yesterday).toBe(3760);
    expect(derived.dayDelta).toBe(12.2);
    expect(sampleData.receipt.moreLineItems).toBe(1284);
    expect(sampleData.receipt.items).toHaveLength(6);
  });
  it('uses all eight integrations across receipt items and trackers', () => {
    const vendors = new Set(sampleData.receipt.items.map((i) => i.vendor));
    const trackers = new Set(sampleData.receipt.items.map((i) => i.tracker).filter(Boolean));
    expect([...vendors].sort()).toEqual(['anthropic', 'cursor', 'github', 'microsoft', 'openai']);
    expect([...trackers].sort()).toEqual(['jira', 'monday', 'notion']);
  });
});

describe('daily spend', () => {
  it('September sums to 128,400 and August to 139,900', () => {
    expect(sum(sampleData.daily.september)).toBe(TOTAL);
    expect(sum(sampleData.daily.august)).toBe(139_900);
    expect(sampleData.daily.september).toHaveLength(30);
    expect(sampleData.daily.august).toHaveLength(30);
    expect(sampleData.daily.labels[0]).toBe('Sep 1');
    expect(sampleData.daily.labels[29]).toBe('Sep 30');
  });
  it('month delta is −8.2%', () => {
    expect(derived.monthDelta).toBe(-8.2);
  });
  it('ranges derive from the daily series', () => {
    expect(sampleData.daily.ranges.last7.september).toEqual(sampleData.daily.september.slice(-7));
    expect(sampleData.daily.ranges.last30.september).toBe(sampleData.daily.september);
    const q = sampleData.daily.ranges.quarter;
    expect(q.labels).toHaveLength(13);
    expect(q.values).toHaveLength(13);
    expect(sum(q.values.slice(-4))).toBe(TOTAL);
  });
  it('forecasts October from the last 14 days', () => {
    expect(derived.forecastOctober).toBe(142_565);
    expect(sampleData.chapters.spendOverTime.forecastOctober.value).toBeGreaterThan(sampleData.chapters.spendOverTime.forecastOctober.budget);
  });
});

describe('product shot', () => {
  it('token-type weeks are sums of the daily series', () => {
    const s = sampleData.daily.september;
    const { output, input } = sampleData.dashboard.tokenType;
    const blocks = [s.slice(2, 9), s.slice(9, 16), s.slice(16, 23), s.slice(23, 30)];
    blocks.forEach((block, i) => expect(output[i] + input[i]).toBe(sum(block)));
    expect(output).toEqual([16801, 18701, 20790, 20734]);
    expect(input).toEqual([10297, 10983, 11695, 11165]);
  });
  it('hourly tokens sum to 684M', () => {
    expect(sum(sampleData.dashboard.hourly.values)).toBe(684_000_000);
    expect(sampleData.dashboard.hourly.values).toHaveLength(24);
    expect(sampleData.dashboard.hourly.labels[0]).toBe('00:00');
  });
  it('stat deltas compute', () => {
    expect(sampleData.dashboard.stats.spendThisMonth.value).toBe(TOTAL);
    expect(sampleData.dashboard.stats.spendThisMonth.delta).toBe(-8.2);
    expect(sampleData.dashboard.stats.spendToday.delta).toBe(12.2);
    expect(sampleData.dashboard.stats.spendToday.trend).toHaveLength(12);
    expect(sampleData.dashboard.stats.tokensToday.delta).toBe(9.1);
    expect(sampleData.dashboard.stats.activeUsers.delta).toBe(2.5);
    expect(sampleData.dashboard.stats.activeUsers.caption).toBe('86% of employees');
  });
  it('top models and health rings', () => {
    expect(sampleData.dashboard.topModels.map((m) => m.label)).toEqual(['Claude Sonnet', 'GPT-5', 'Claude Opus', 'Claude Haiku']);
    expect(sampleData.dashboard.health).toEqual({ budgetUsed: 92, cacheHit: 41 });
  });
});

describe('vendors and models', () => {
  it('output costs nearly twice input and the gap widens', () => {
    expect(derived.tokenType.outputToInputRatio).toBe(1.86);
    expect(derived.tokenType.gapFirst).toBe(6504);
    expect(derived.tokenType.gapLast).toBe(9569);
    expect(derived.tokenType.gapWidening).toBe(true);
    expect(derived.tokenType.outputShareFirst).toBe(62);
    expect(derived.tokenType.outputShareLast).toBe(65);
  });
  it('top five models exclude seats', () => {
    expect(sampleData.chapters.vendorsModels.topModels).toHaveLength(5);
    expect(sampleData.chapters.vendorsModels.topModels.some((m) => m.label.startsWith('Seats'))).toBe(false);
  });
});

describe('tasks', () => {
  it('receipt rows recompute from the fixture makeup', () => {
    for (const row of sampleData.chapters.tasks.receipts) {
      const m = row.makeup;
      let cost = 0;
      if (m.model && m.tokensIn != null && m.tokensOut != null) {
        cost += costFromTokens(m.model, m.tokensIn, m.tokensOut);
        expect(m.tokensIn + m.tokensOut).toBe(row.tokens);
      }
      if (m.cursorUsage) cost += m.cursorUsage;
      if (m.credits) cost += m.credits * CREDIT_PRICE;
      expect(Math.round(cost * 100) / 100).toBe(row.cost);
    }
  });
  it('ENG-1423 costs the same in the receipts table and the waste chapter', () => {
    const a = sampleData.chapters.tasks.receipts.find((r) => r.taskKey === 'ENG-1423')!;
    const b = sampleData.chapters.waste.mostExpensiveTasks.find((r) => r.taskKey === 'ENG-1423')!;
    expect(a.cost).toBe(612.4);
    expect(b.cost).toBe(a.cost);
  });
});

describe('teams', () => {
  it('cost per active user and shares', () => {
    expect(derived.teams.costPerActiveUser).toBe(441.24);
    expect(derived.teams.costPerActiveUserAugust).toBe(499.64);
    expect(derived.teams.costPerActiveUserDelta).toBe(-11.7);
    expect(derived.teams.engineeringActiveShare).toBe(31);
    expect(sampleData.chapters.teams.concentration).toEqual({ share: 58, topUsersShare: 12 });
    expect(sampleData.chapters.teams.activeUsers.values).toEqual([212, 228, 236, 251, 263, 270, 284, 291]);
  });
});

describe('waste', () => {
  it('most expensive tasks sum to $5,442.40 and are ranked', () => {
    expect(derived.waste.mostExpensiveTotal).toBe(5442.4);
    expect(derived.waste.mostExpensiveShare).toBe(4.2);
    const costs = sampleData.chapters.waste.mostExpensiveTasks.map((t) => t.cost);
    expect([...costs].sort((a, b) => b - a)).toEqual(costs);
  });
  it('cache hit rates by tool and the weighted total', () => {
    expect(derived.waste.cacheHitByTool.map((t) => t.hitRate)).toEqual([55, 40, 28, 10]);
    expect(derived.waste.cacheHitOverall).toBe(41.3);
    expect(derived.waste.cacheHitOverallRounded).toBe(41);
    expect(sampleData.chapters.waste.cacheHitOverall).toBe(sampleData.dashboard.health.cacheHit);
  });
});

describe('budgets', () => {
  it('budget used rounds to 92% and the lines reconcile', () => {
    expect(derived.budgetUsed).toBe(91.7);
    expect(derived.budgetUsedRounded).toBe(92);
    const b = sampleData.chapters.budgets;
    expect(b.cumulativeSpend[29]).toBe(TOTAL);
    expect(b.cumulativeSpend[0]).toBe(3534);
    expect(b.budgetLine[29]).toBe(140_000);
    expect(b.budgetLine).toHaveLength(30);
    expect(b.alerts).toHaveLength(3);
    expect(b.alerts.map((a) => a.badge)).toEqual(['Over 90%', 'Spike', 'Variance']);
  });
});

describe('determinism', () => {
  it('contains no functions or dates', () => {
    const walk = (v: unknown): void => {
      expect(typeof v).not.toBe('function');
      expect(v instanceof Date).toBe(false);
      if (v && typeof v === 'object') Object.values(v).forEach(walk);
    };
    walk(sampleData);
    expect(sampleData.today).toBe('2026-09-30');
  });
});
