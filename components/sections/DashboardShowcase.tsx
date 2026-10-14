import { landing } from '@/content/landing';
import { InsightsDashboard } from '@/components/dashboards/InsightsDashboard';
import { ChartReveal } from '@/components/motion/ChartReveal';
import { ScrubTilt } from '@/components/motion/ScrubTilt';
import { SectionIntro } from './SectionIntro';

const copy = landing.dashboards;

/** The product shot (§6.5): framed in a radius-xl panel, settling in with a scrubbed tilt on wide screens. */
export function DashboardShowcase() {
  return (
    <section id="dashboards" className="section" aria-labelledby="dashboards-heading">
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
        <SectionIntro id="dashboards-heading" overline={copy.overline} heading={copy.heading} body={copy.body} />
        <div>
          <ScrubTilt>
            <div style={{ position: 'relative' }}>
              <ChartReveal start="top 50%">
                <div className="shot">
                  <InsightsDashboard />
                </div>
              </ChartReveal>
            </div>
          </ScrubTilt>
          <p className="caption text-ink-muted" style={{ margin: 'var(--space-4) 0 0' }}>
            {copy.shot.sampleCaption}
          </p>
        </div>
      </div>
    </section>
  );
}
