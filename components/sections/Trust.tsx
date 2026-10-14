import { landing } from '@/content/landing';
import { Icon } from '@/components/ds/Icon';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';

const copy = landing.trust;

/** Quiet by design (§6.9): four points on privacy and staying out of the way. */
export function Trust() {
  return (
    <section id="trust" className="section" aria-labelledby="trust-heading">
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
        <SectionIntro id="trust-heading" overline={copy.overline} heading={copy.heading} body={copy.lede} />
        <Reveal as="ul" selector="li" distance={24} className="points is-four" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {copy.points.map((p) => (
            <li key={p.title} className="amb-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <Icon name={p.icon} size={24} className="text-accent-ink" />
              <h3 className="headline" style={{ margin: 0 }}>
                {p.title}
              </h3>
              <p className="body text-ink-secondary" style={{ margin: 0 }}>
                {p.body}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
