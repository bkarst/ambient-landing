import { landing } from '@/content/landing';
import { sampleData } from '@/content/sample-data';
import { Badge } from '@/components/ds/Badge';
import { Card } from '@/components/ds/Card';
import { LineChart } from '@/components/ds/LineChart';
import { Ring } from '@/components/ds/Ring';
import { Reveal } from '@/components/motion/Reveal';
import { ValueChapter } from '@/components/sections/ValueChapter';

const copy = landing.chapters.budgets;
const d = sampleData.chapters.budgets;

export function Budgets() {
  return (
    <ValueChapter copy={copy} flipped>
      <div className="visual-2-1">
        <Card title={copy.cards.budget.title} subtitle={copy.cards.budget.subtitle}>
          <LineChart
            title={copy.cards.budget.title}
            labels={[...d.labels]}
            series={[
              { name: copy.cards.budget.series[0], values: [...d.cumulativeSpend] },
              { name: copy.cards.budget.series[1], values: [...d.budgetLine] },
            ]}
            format="currency"
            height={220}
          />
        </Card>
        <Card compact>
          <div className="ringcard" style={{ height: '100%' }}>
            <Ring value={d.budgetUsed} text={`${d.budgetUsed}%`} label={copy.cards.ring.label} size={120} />
          </div>
        </Card>
      </div>
      <Card title={copy.cards.alerts.title} subtitle={copy.cards.alerts.subtitle}>
        <Reveal as="ul" selector="li" distance={8} stagger={0.05} style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
          {d.alerts.map((a) => (
            <li key={a.message} className="body" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) 0', borderTop: '1px solid var(--line)' }}>
              <Badge tone={a.tone} icon={a.tone === 'negative' ? 'alerts' : undefined}>
                {a.badge}
              </Badge>
              <span style={{ flex: 1, minWidth: 0 }}>{a.message}</span>
              <span className="caption text-ink-muted" style={{ flex: 'none' }}>
                {a.date}
              </span>
            </li>
          ))}
        </Reveal>
      </Card>
    </ValueChapter>
  );
}
