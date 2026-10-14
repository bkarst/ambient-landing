import { landing } from '@/content/landing';
import { sampleData } from '@/content/sample-data';
import { Badge } from '@/components/ds/Badge';
import { Button } from '@/components/ds/Button';
import { Card } from '@/components/ds/Card';
import { Sidebar } from '@/components/ds/Sidebar';
import { Stat } from '@/components/ds/Stat';
import { BarChart } from '@/components/mui/BarChart';
import { LineChart } from '@/components/mui/LineChart';
import { Ring } from '@/components/mui/Ring';
import { Spark } from '@/components/mui/Spark';
import { CountUp } from '@/components/motion/CountUp';
import { RangeLineChart } from '@/components/motion/RangeLineChart';
import { RankedBars } from './RankedBars';

const copy = landing.dashboards.shot;
const d = sampleData.dashboard;

const ranges = [
  { id: 'last30', label: 'Last 30 days', labels: sampleData.daily.ranges.last30.labels, series: [{ name: copy.cards.daily.series[0], values: sampleData.daily.ranges.last30.september }, { name: copy.cards.daily.series[1], values: sampleData.daily.ranges.last30.august }] },
  { id: 'last7', label: 'Last 7 days', labels: sampleData.daily.ranges.last7.labels, series: [{ name: copy.cards.daily.series[0], values: sampleData.daily.ranges.last7.september }, { name: copy.cards.daily.series[1], values: sampleData.daily.ranges.last7.august }] },
  { id: 'quarter', label: 'This quarter', labels: sampleData.daily.ranges.quarter.labels, series: [{ name: 'Weekly spend', values: sampleData.daily.ranges.quarter.values }] },
] as const;

/**
 * The product shot (§6.5): the product's Insights view, rendered live from design-system components and
 * reflowing with real layout, never a CSS transform. Charts, sparklines and rings are MUI X Charts wrapped
 * in the design system's API (components/mui). The sidebar is decorative here (inert, hidden from AT).
 */
export function InsightsDashboard() {
  return (
    <div className="shot-app">
      <div className="shot-sidebar" inert aria-hidden="true">
        <Sidebar
          label={copy.navLabel}
          active="insights"
          items={copy.nav.map((n) => ('section' in n ? { section: n.section } : { id: n.id, label: n.label, icon: n.icon, badge: 'badge' in n ? n.badge : undefined }))}
          footer={<Badge tone="live">{copy.live}</Badge>}
          style={{ height: '100%' }}
        />
      </div>
      <div className="shot-main">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <div>
            <h3 className="title-2" style={{ margin: 0 }}>
              {copy.title}
            </h3>
            <p className="label text-ink-muted" style={{ margin: '2px 0 0' }}>
              {copy.caption}
            </p>
          </div>
          <div className="amb-row" style={{ gap: 'var(--space-3)' }}>
            <Badge tone="neutral">{copy.sample}</Badge>
            <Button variant="secondary" size="sm" icon="download" aria-disabled="true" title={copy.exportTip} tabIndex={-1}>
              {copy.exportLabel}
            </Button>
          </div>
        </div>

        <div className="shot-stats">
          <Card compact>
            <Stat
              label={copy.tiles.spendMonth.label}
              value={<CountUp value={d.stats.spendThisMonth.value} mode="currency" trigger="manual" />}
              hero
              delta={d.stats.spendThisMonth.delta}
              upIsGood={false}
              period={copy.tiles.spendMonth.period}
              caption={copy.tiles.spendMonth.caption}
            />
          </Card>
          <Card compact>
            <Stat
              label={copy.tiles.spendToday.label}
              value={<CountUp value={d.stats.spendToday.value} mode="integer" prefix="$" trigger="manual" />}
              delta={d.stats.spendToday.delta}
              upIsGood={false}
              period={copy.tiles.spendToday.period}
              spark={<Spark values={[...d.stats.spendToday.trend]} width={72} height={28} />}
            />
          </Card>
          <Card compact>
            <Stat
              label={copy.tiles.tokensToday.label}
              value={<CountUp value={d.stats.tokensToday.value} mode="compact" trigger="manual" />}
              delta={d.stats.tokensToday.delta}
              period={copy.tiles.tokensToday.period}
              spark={<Spark values={[...d.hourly.values.slice(-12)]} width={72} height={28} />}
            />
          </Card>
          <Card compact>
            <Stat
              label={copy.tiles.activeUsers.label}
              value={<CountUp value={d.stats.activeUsers.value} mode="integer" trigger="manual" />}
              delta={d.stats.activeUsers.delta}
              period={copy.tiles.activeUsers.period}
              caption={copy.tiles.activeUsers.caption}
            />
          </Card>
        </div>

        <div className="shot-row-2">
          <Card title={copy.cards.daily.title} subtitle={copy.cards.daily.subtitle}>
            <RangeLineChart chartId="ov-daily" title={copy.cards.daily.title} ranges={ranges} height={200} selectLabel={copy.rangeLabel} />
          </Card>
          <Card title={copy.cards.tokenType.title} subtitle={copy.cards.tokenType.subtitle} action={<Badge tone="neutral">{copy.sample}</Badge>}>
            <BarChart
              title={copy.cards.tokenType.title}
              labels={d.tokenType.labels.map((l) => l.replace(/^Sep /, ''))}
              series={[
                { name: copy.cards.tokenType.series[0], values: [...d.tokenType.output] },
                { name: copy.cards.tokenType.series[1], values: [...d.tokenType.input] },
              ]}
              format="currency"
              height={200}
            />
          </Card>
        </div>

        <div className="shot-row-3">
          <Card title={copy.cards.topModels.title} subtitle={copy.cards.topModels.subtitle}>
            <RankedBars title={copy.cards.topModels.title} seriesName={copy.cards.topModels.series} points={d.topModels} height={160} />
          </Card>
          <Card title={copy.cards.hourly.title} subtitle={copy.cards.hourly.subtitle}>
            <LineChart title={copy.cards.hourly.title} labels={[...d.hourly.labels]} series={[{ name: copy.cards.hourly.series, values: [...d.hourly.values] }]} format="tokens" valueLabel={copy.cards.hourly.series} height={160} />
          </Card>
          <Card title={copy.cards.health.title} subtitle={copy.cards.health.subtitle}>
            <div className="ringcard">
              <Ring value={d.health.budgetUsed} text={`${d.health.budgetUsed}%`} label={copy.cards.health.budget} size={104} />
              <Ring value={d.health.cacheHit} text={`${d.health.cacheHit}%`} label={copy.cards.health.cache} size={104} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
