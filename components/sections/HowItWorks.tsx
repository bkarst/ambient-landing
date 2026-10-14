import { site, spendIntegrations, contextIntegrations } from '@/config/site';
import { landing } from '@/content/landing';
import { Icon } from '@/components/ds/Icon';
import { Reveal } from '@/components/motion/Reveal';
import { HowItWorksDiagram } from './HowItWorksDiagram';
import { SectionIntro } from './SectionIntro';

const copy = landing.howItWorks;

/** Connect, attribute, reconcile (§6.8), with the integrations diagram generated from config. */
export function HowItWorks() {
  const spend = spendIntegrations.map((i) => ({ id: i.id, name: i.name }));
  const context = contextIntegrations.map((i) => ({ id: i.id, name: i.name }));

  return (
    <section id="how-it-works" className="section" aria-labelledby="how-heading" data-atmo="navy-left">
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
        <SectionIntro id="how-heading" overline={copy.overline} heading={copy.heading} />
        <Reveal as="ol" selector="li" distance={24} className="steps" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {copy.steps.map((s) => (
            <li key={s.number} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <span className="eyebrow">{s.number}</span>
              <Icon name={s.icon} size={24} className="text-accent-ink" />
              <h3 className="headline" style={{ margin: 0 }}>
                {s.title}
              </h3>
              <p className="body text-ink-secondary" style={{ margin: 0 }}>
                {s.body}
              </p>
            </li>
          ))}
        </Reveal>
        <p className="caption text-ink-muted" style={{ margin: 0 }}>
          {copy.footnote}
        </p>
        <figure style={{ margin: 0 }} role="img" aria-label={copy.diagram.ariaLabel}>
          <div className="hidden md:block">
            <HowItWorksDiagram spend={spend} context={context} spendHeading={copy.diagram.spendHeading} contextHeading={copy.diagram.contextHeading} productName={site.name} />
          </div>
          <div className="grid gap-5 md:hidden" aria-hidden="true">
            <DiagramList heading={copy.diagram.spendHeading} names={spend.map((n) => n.name)} />
            <p className="headline" style={{ margin: 0, textAlign: 'center' }}>
              ↓ {site.name} ↓
            </p>
            <DiagramList heading={copy.diagram.contextHeading} names={context.map((n) => n.name)} />
          </div>
        </figure>
      </div>
    </section>
  );
}

function DiagramList({ heading, names }: { heading: string; names: string[] }) {
  return (
    <div className="amb-card is-compact" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <span className="eyebrow">{heading.toUpperCase()}</span>
      <span className="body">{names.join(' · ')}</span>
    </div>
  );
}
