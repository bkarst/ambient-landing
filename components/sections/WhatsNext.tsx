import { landing } from '@/content/landing';
import { site } from '@/config/site';
import { Badge } from '@/components/ds/Badge';
import { Icon } from '@/components/ds/Icon';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';

const copy = landing.whatsNext;

/** Direction, stated as not yet built (§6.10). The only place the page shows plans rather than product. */
export function WhatsNext() {
  return (
    <section id="whats-next" className="section" aria-labelledby="next-heading">
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
        <SectionIntro id="next-heading" overline={copy.overline} heading={copy.heading} body={copy.lede} centered />
        <Reveal as="ul" selector="li" distance={24} className="points is-four" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {copy.items.map((p) => (
            <li key={p.title} className="amb-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Icon name={p.icon} size={24} className="text-accent-ink" />
                <Badge tone="neutral">{copy.badge}</Badge>
              </div>
              <h3 className="headline" style={{ margin: 0 }}>
                {p.title}
              </h3>
              <p className="body text-ink-secondary" style={{ margin: 0 }}>
                {p.body}
              </p>
            </li>
          ))}
        </Reveal>
        <p className="caption text-ink-muted" style={{ margin: 0, textAlign: 'center' }}>
          <a href={site.cta.primary.href} className="inline-link" style={{ color: 'var(--ink-secondary)' }}>
            {copy.captionLink}
          </a>
        </p>
      </div>
    </section>
  );
}
