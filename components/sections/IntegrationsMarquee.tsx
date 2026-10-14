import { site } from '@/config/site';
import { landing } from '@/content/landing';
import { logos } from '@/components/integrations/logos';
import { Marquee } from '@/components/motion/Marquee';
import { SectionIntro } from './SectionIntro';

const copy = landing.integrations;

function LogoList({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="marquee-list" aria-hidden={hidden ? 'true' : undefined} inert={hidden || undefined}>
      {site.integrations.map((i) => {
        const entry = logos[i.id];
        return (
          <li key={i.id} className="marquee-logo" style={{ transform: entry.scale !== 1 ? `scale(${entry.scale})` : undefined }}>
            <entry.Wordmark name={entry.name} decorative={hidden} />
          </li>
        );
      })}
    </ul>
  );
}

/** Rolling logos (§6.3). The list renders twice for a seamless loop; the second copy is hidden from assistive tech. */
export function IntegrationsMarquee() {
  return (
    <section id="integrations" className="section" aria-labelledby="integrations-heading">
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <SectionIntro id="integrations-heading" heading={copy.heading} centered size="title-2" />
        <Marquee list={<LogoList />} listHidden={<LogoList hidden />} pauseLabel={copy.pause} playLabel={copy.play} />
        <p className="caption text-ink-muted" style={{ margin: 0, textAlign: 'center' }}>
          {copy.caption}
        </p>
      </div>
    </section>
  );
}
