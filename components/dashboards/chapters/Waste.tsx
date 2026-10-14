import { landing } from '@/content/landing';
import { sampleData, derived } from '@/content/sample-data';
import { shortLabels } from '@/content/short-labels';
import { Card } from '@/components/ds/Card';
import { Ring } from '@/components/ds/Ring';
import { RankedBars } from '@/components/dashboards/RankedBars';
import { ValueChapter } from '@/components/sections/ValueChapter';

const copy = landing.chapters.waste;
const d = sampleData.chapters.waste;

export function Waste() {
  const expensive = d.mostExpensiveTasks.map((t) => ({ label: t.title, value: t.cost }));
  const cache = derived.waste.cacheHitByTool.map((t) => ({ label: t.tool, value: t.hitRate }));
  return (
    <ValueChapter copy={copy}>
      <Card title={copy.cards.expensive.title} subtitle={copy.cards.expensive.subtitle}>
        <RankedBars title={copy.cards.expensive.title} seriesName={copy.cards.expensive.series} points={expensive} shortLabels={shortLabels} />
      </Card>
      <div className="visual-2-1">
        <Card title={copy.cards.cacheByTool.title} subtitle={copy.cards.cacheByTool.subtitle}>
          <RankedBars title={copy.cards.cacheByTool.title} seriesName={copy.cards.cacheByTool.series} points={cache} format="percent" />
        </Card>
        <Card compact title={copy.cards.cacheRing.label} subtitle={copy.cards.cacheRing.caption}>
          <div className="ringcard">
            <Ring value={d.cacheHitOverall} text={`${d.cacheHitOverall}%`} size={112} />
          </div>
        </Card>
      </div>
    </ValueChapter>
  );
}
