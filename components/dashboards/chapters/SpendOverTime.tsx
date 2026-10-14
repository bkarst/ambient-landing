import { landing } from '@/content/landing';
import { sampleData } from '@/content/sample-data';
import { Card } from '@/components/ds/Card';
import { Stat } from '@/components/ds/Stat';
import { CountUp } from '@/components/motion/CountUp';
import { RangeLineChart } from '@/components/motion/RangeLineChart';
import { ValueChapter } from '@/components/sections/ValueChapter';

const copy = landing.chapters.spendOverTime;
const d = sampleData.chapters.spendOverTime;
const r = sampleData.daily.ranges;
const ranges = [
  { id: 'last30', label: 'Last 30 days', labels: r.last30.labels, series: [{ name: copy.cards.daily.series[0], values: r.last30.september }, { name: copy.cards.daily.series[1], values: r.last30.august }] },
  { id: 'last7', label: 'Last 7 days', labels: r.last7.labels, series: [{ name: copy.cards.daily.series[0], values: r.last7.september }, { name: copy.cards.daily.series[1], values: r.last7.august }] },
  { id: 'quarter', label: 'This quarter', labels: r.quarter.labels, series: [{ name: 'Weekly spend', values: r.quarter.values }] },
] as const;

export function SpendOverTime() {
  return (
    <ValueChapter copy={copy}>
      <div className="visual-2-1">
        <Card title={copy.cards.daily.title} subtitle={copy.cards.daily.subtitle}>
          <RangeLineChart chartId="ch1-daily" title={copy.cards.daily.title} ranges={ranges} height={220} selectLabel={copy.cards.daily.rangeLabel} />
        </Card>
        <div className="visual-stack">
          <Card compact>
            <Stat label={copy.cards.spendMonth.label} value={<CountUp value={d.spendInSeptember.value} mode="currency" trigger="manual" />} delta={d.spendInSeptember.delta} upIsGood={false} period={copy.cards.spendMonth.period} />
          </Card>
          <Card compact>
            <Stat label={copy.cards.forecast.label} value={<CountUp value={d.forecastOctober.value} mode="currency" trigger="manual" />} caption={copy.cards.forecast.caption} />
          </Card>
        </div>
      </div>
    </ValueChapter>
  );
}
