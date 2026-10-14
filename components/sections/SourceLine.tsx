import { Icon } from '@/components/ds/Icon';
import { sources, type Source, type SourceId } from '@/content/sources';

/**
 * A citation in caption type. Links to the primary source when its URL has been verified; until then
 * it names the publisher without a link (spec §6.4). Outbound citations are `noopener`, never `nofollow`.
 */
export function SourceLine({ sourceId, text, className }: { sourceId: SourceId; text: string; className?: string }) {
  const s: Source = sources[sourceId];
  const label = s.firstParty ? `${s.publisher}, ${s.date ?? ''}`.replace(/, $/, '') : s.via ? `${s.publisher}, via ${s.via}` : s.publisher;
  return (
    <p className={`caption text-ink-muted ${className ?? ''}`} style={{ margin: 0 }}>
      <span className="text-ink-secondary">{text}</span>{' '}
      {s.url ? (
        <a href={s.url} rel="noopener" className="inline-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 2, color: 'var(--ink-muted)' }}>
          {label}
          <Icon name="external" size={12} />
        </a>
      ) : (
        <span>{label}</span>
      )}
    </p>
  );
}
