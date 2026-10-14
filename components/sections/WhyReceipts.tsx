import { landing } from '@/content/landing';
import { CountUp } from '@/components/motion/CountUp';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import { SourceLine } from './SourceLine';

const copy = landing.why;

/** The problem, in cited figures (§6.4). Figures count up once as they enter the viewport. */
export function WhyReceipts() {
  return (
    <section id="why" className="section" aria-labelledby="why-heading">
      <div className="wrap grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-16 items-start">
        <div className="xl:col-span-5">
          <SectionIntro id="why-heading" overline={copy.overline} heading={copy.heading} body={copy.body} />
        </div>
        <Reveal as="ul" selector="li" distance={16} className="xl:col-span-7" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {copy.figures.map((f) => (
            <li key={f.sourceId} className="grid grid-cols-[minmax(96px,auto)_1fr] gap-x-6 gap-y-2 items-baseline py-6 border-t border-line first:border-t-0 first:pt-0">
              <span className="stat-large" style={{ fontVariantNumeric: 'tabular-nums' }}>
                <CountUp value={f.value} mode="percent" />
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <p className="body" style={{ margin: 0 }}>
                  {f.sentence}
                </p>
                <SourceLine sourceId={f.sourceId} text="Source:" />
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
