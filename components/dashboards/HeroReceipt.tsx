import { landing } from '@/content/landing';
import { sampleData, derived } from '@/content/sample-data';
import { Badge } from '@/components/ds/Badge';
import { Delta } from '@/components/ds/Delta';
import { compact } from '@/components/ds/format';
import { IntegrationSymbol } from '@/components/integrations/logos';
import { CountUp } from '@/components/motion/CountUp';

const copy = landing.hero.receipt;
const data = sampleData.receipt;

/**
 * The live receipt (§6.2): a card styled as a receipt, perforated top and bottom, six line items that use
 * all eight integrations, and a total that reconciles to the day's fixture value.
 */
export function HeroReceipt() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 440 }}>
      <Badge tone="neutral" className="absolute -top-8 right-0 hidden md:inline-flex">
        {copy.sample}
      </Badge>
      <section className="amb-card receipt" aria-label={copy.title}>
        <div className="amb-card-head" style={{ marginBottom: 'var(--space-4)' }}>
          <div>
            <p className="amb-card-title title-3" style={{ margin: 0 }}>
              {copy.title}
            </p>
            <p className="amb-card-sub">{copy.subtitle}</p>
          </div>
          <div className="amb-card-action">
            <Badge tone="live">{copy.live}</Badge>
          </div>
        </div>

        <ul data-receipt-lines style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {data.items.map((item) => (
            <li key={`${item.taskKey ?? ''}${item.title}`} className="receipt-row" style={{ padding: 'var(--space-3) 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)', alignItems: 'baseline' }}>
                <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                  {item.tracker && <IntegrationSymbol id={item.tracker} decorative />}
                  {item.taskKey && <span className="text-ink-muted tabular">{item.taskKey}</span>}
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
                </span>
                <span className="tabular" style={{ fontVariantNumeric: 'tabular-nums', flex: 'none' }}>
                  <CountUp value={item.cost} mode="cents" prefix="$" trigger="manual" />
                </span>
              </div>
              <div className="caption text-ink-muted" style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                <IntegrationSymbol id={item.vendor} decorative />
                <span>{item.tool}</span>
                <span aria-hidden="true">·</span>
                <span>{item.team}</span>
                <span aria-hidden="true">·</span>
                <span className="code" style={{ fontSize: '0.75rem', lineHeight: '1rem' }}>
                  {item.model}
                </span>
                {item.tokens != null && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{compact(item.tokens)} tokens</span>
                  </>
                )}
                <span className="text-ink-secondary" style={{ marginLeft: 'auto' }}>
                  {item.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className="caption text-ink-muted" style={{ margin: 'var(--space-3) 0 0', borderTop: '1px solid var(--line)', paddingTop: 'var(--space-3)' }}>
          + {data.moreLineItems.toLocaleString('en-US')} more line items
        </p>

        <div data-receipt-total style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--line)' }}>
          <div>
            <span className="label text-ink-muted" style={{ display: 'block' }}>
              {copy.totalLabel}
            </span>
            <span className="stat" style={{ display: 'block', marginTop: 4 }}>
              <CountUp value={data.totalToday} mode="cents" prefix="$" trigger="manual" />
            </span>
          </div>
          <span data-receipt-delta>
            <Delta value={derived.dayDelta} upIsGood={false} period={copy.deltaPeriod} />
          </span>
        </div>
      </section>
      <p className="caption text-ink-muted md:hidden" style={{ margin: 'var(--space-3) 0 0', textAlign: 'center' }}>
        {copy.sample}
      </p>
    </div>
  );
}
