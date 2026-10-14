import { landing } from '@/content/landing';
import { Button } from '@/components/ds/Button';
import { HeroReceipt } from '@/components/dashboards/HeroReceipt';
import { HalftoneSun } from '@/components/motion/HalftoneSun';
import { HeroMotion } from '@/components/motion/HeroMotion';
import { HeroCtaFocus } from './HeroCtaFocus';

const copy = landing.hero;

/**
 * The hero (§6.2). The h1 is the LCP element and renders visible in the server HTML; only the receipt rows
 * and the halftone sun start hidden, behind a CSS failsafe (§8.3).
 */
export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-heading">
      <HalftoneSun className="hero-art" />
      <div className="wrap" style={{ position: 'relative' }}>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center" style={{ minHeight: 'min(calc(100svh - 56px), 880px)', paddingBlock: 'var(--space-16)' }}>
          <div className="flex flex-col gap-6" style={{ maxWidth: 560 }}>
            <h1 id="hero-heading" style={{ margin: 0 }}>
              <span className="eyebrow" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
                {copy.eyebrow}
              </span>
              <span className="amb-sr">: </span>
              <span className="display-fluid" style={{ display: 'block' }}>
                {copy.headline}
              </span>
            </h1>
            <p className="body-large text-ink-secondary" style={{ margin: 0 }}>
              {copy.lede}
            </p>
            <div className="flex flex-col sm:flex-row gap-3" data-primary-owner>
              <Button href={copy.primary.href} variant="primary" size="lg" data-cta="hero-primary">
                {copy.primary.label}
              </Button>
              <Button href={copy.secondary.href} variant="secondary" size="lg" data-cta="hero-secondary">
                {copy.secondary.label}
              </Button>
            </div>
            <p className="caption text-ink-muted" style={{ margin: 0 }}>
              {copy.microcopy}
            </p>
            <HeroCtaFocus />
          </div>
          <div className="flex justify-center xl:justify-end" style={{ position: 'relative' }}>
            <HeroMotion>
              <HeroReceipt />
            </HeroMotion>
          </div>
        </div>
      </div>
    </section>
  );
}
