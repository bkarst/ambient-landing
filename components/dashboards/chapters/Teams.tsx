import { landing } from '@/content/landing';
import { sampleData } from '@/content/sample-data';
import { shortLabels } from '@/content/short-labels';
import { Card } from '@/components/ds/Card';
import { LineChart } from '@/components/ds/LineChart';
import { Ring } from '@/components/ds/Ring';
import { Stat } from '@/components/ds/Stat';
import { CountUp } from '@/components/motion/CountUp';
import { RankedBars } from '@/components/dashboards/RankedBars';
import { ValueChapter } from '@/components/sections/ValueChapter';

const copy = landing.chapters.teams;
const d = sampleData.chapters.teams;

export function Teams() {
  return (
    <ValueChapter copy={copy} flipped>
      <div className="visual-2-1">
        <Card title={copy.cards.byTeam.title} subtitle={copy.cards.byTeam.subtitle}>
          <RankedBars title={copy.cards.byTeam.title} seriesName={copy.cards.byTeam.series} points={d.byTeam} shortLabels={shortLabels} />
        </Card>
        <Card title={copy.cards.concentration.title} subtitle={copy.cards.concentration.subtitle}>
          <div className="ringcard" style={{ paddingTop: 'var(--space-2)' }}>
            <Ring value={d.concentration.share} text={`${d.concentration.share}%`} label={copy.cards.concentration.ringLabel} size={120} />
          </div>
        </Card>
      </div>
      <Card title={copy.cards.active.title} subtitle={copy.cards.active.subtitle}>
        <div className="visual-2-1" style={{ alignItems: 'end' }}>
          <LineChart title={copy.cards.active.title} labels={[...d.activeUsers.labels]} series={[{ name: copy.cards.active.series, values: [...d.activeUsers.values] }]} valueLabel={copy.cards.active.series} format="compact" height={160} />
          <Stat label={copy.cards.active.stat.label} value={<CountUp value={d.costPerActiveUser.value} mode="integer" prefix="$" trigger="manual" />} delta={d.costPerActiveUser.delta} upIsGood={false} period={copy.cards.active.stat.period} />
        </div>
      </Card>
    </ValueChapter>
  );
}
