import { landing } from '@/content/landing';
import { sampleData } from '@/content/sample-data';
import { Card } from '@/components/ds/Card';
import { BarChart } from '@/components/ds/BarChart';
import { RankedBars } from '@/components/dashboards/RankedBars';
import { ValueChapter } from '@/components/sections/ValueChapter';

const copy = landing.chapters.vendorsModels;
const d = sampleData.chapters.vendorsModels;

export function VendorsModels() {
  return (
    <ValueChapter copy={copy} flipped>
      <div className="visual-2">
        <Card title={copy.cards.topModels.title} subtitle={copy.cards.topModels.subtitle}>
          <RankedBars title={copy.cards.topModels.title} seriesName={copy.cards.topModels.series} points={d.topModels} height={214} />
        </Card>
        <Card title={copy.cards.tokenType.title} subtitle={copy.cards.tokenType.subtitle}>
          <BarChart
            title={copy.cards.tokenType.title}
            labels={d.tokenType.labels.map((l) => l.replace(/^Sep /, ''))}
            series={[
              { name: copy.cards.tokenType.series[0], values: [...d.tokenType.output] },
              { name: copy.cards.tokenType.series[1], values: [...d.tokenType.input] },
            ]}
            format="currency"
            height={214}
          />
        </Card>
      </div>
    </ValueChapter>
  );
}
