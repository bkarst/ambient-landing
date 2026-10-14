import { landing } from '@/content/landing';
import { sampleData } from '@/content/sample-data';
import { compact } from '@/components/ds/format';
import { IntegrationSymbol, logos } from '@/components/integrations/logos';
import { Reveal } from '@/components/motion/Reveal';

const copy = landing.chapters.tasks.cards.receipts;
const rows = sampleData.chapters.tasks.receipts;

/** Task receipts (§6.7.3): a real table with a caption; on compact it reflows to two lines per row, never a horizontal scroll. */
export function ReceiptsTable() {
  return (
    <Reveal selector="tbody tr" distance={8} stagger={0.05} className="receipts-wrap">
      <table className="receipts-table body">
        <caption className="amb-sr">{copy.caption}</caption>
        <thead>
          <tr>
            <th scope="col">{copy.columns.task}</th>
            <th scope="col">{copy.columns.tracker}</th>
            <th scope="col">{copy.columns.team}</th>
            <th scope="col">{copy.columns.model}</th>
            <th scope="col" className="num">
              {copy.columns.tokens}
            </th>
            <th scope="col" className="num">
              {copy.columns.cost}
            </th>
            <th scope="col">{copy.columns.status}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.taskKey ?? ''}${r.title}`}>
              <td className="task">
                {r.taskKey && <span className="tabular text-ink-muted" style={{ marginRight: 6, whiteSpace: 'nowrap' }}>{r.taskKey}</span>}
                {r.title}
              </td>
              <td className="meta">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {r.tracker ? (
                    <>
                      <IntegrationSymbol id={r.tracker} decorative />
                      {logos[r.tracker].name}
                    </>
                  ) : (
                    '—'
                  )}
                </span>
              </td>
              <td className="meta">{r.team}</td>
              <td className="meta">
                <span className="code" style={{ fontSize: '0.8125rem' }}>
                  {r.modelOrTool}
                </span>
              </td>
              <td className="meta tokens num" data-tokens={r.tokens != null ? '' : undefined}>
                {r.tokens != null ? compact(r.tokens) : '—'}
              </td>
              <td className="cost num" style={{ fontWeight: 600 }}>
                {r.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </td>
              <td className="meta">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}
