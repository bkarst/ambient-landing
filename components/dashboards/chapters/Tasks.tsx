import { landing } from '@/content/landing';
import { sampleData } from '@/content/sample-data';
import { shortLabels } from '@/content/short-labels';
import { Card } from '@/components/ds/Card';
import { RankedBars } from '@/components/dashboards/RankedBars';
import { ReceiptsTable } from '@/components/dashboards/ReceiptsTable';
import { ValueChapter } from '@/components/sections/ValueChapter';

const copy = landing.chapters.tasks;
const d = sampleData.chapters.tasks;

export function Tasks() {
  return (
    <ValueChapter copy={copy}>
      <Card title={copy.cards.taskType.title} subtitle={copy.cards.taskType.subtitle}>
        <RankedBars title={copy.cards.taskType.title} seriesName={copy.cards.taskType.series} points={d.byTaskType} shortLabels={shortLabels} />
      </Card>
      <Card title={copy.cards.receipts.title} subtitle={copy.cards.receipts.subtitle}>
        <ReceiptsTable />
      </Card>
    </ValueChapter>
  );
}
