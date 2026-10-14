import { site } from '@/config/site';
import { landing } from '@/content/landing';
import { Button } from '@/components/ds/Button';
import { Logo } from '@/components/ds/Logo';
import { SplitWords } from '@/components/motion/SplitWords';
import { currentYear } from '@/lib/year';

const copy = landing.footer;

/** Footer (§6.13): the question block on a sunken ground, then links and the legal line. */
export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer style={{ marginTop: 'var(--space-16)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <h2 className="amb-sr">{copy.heading}</h2>
      <div className="footer-tagline">
        <div className="wrap" style={{ paddingBlock: 'var(--space-16)', position: 'relative' }}>
          <div className="footer-mark" aria-hidden="true">
            <Logo variant="mark" size={160} />
          </div>
          <div className="flex flex-col gap-5 items-start" style={{ maxWidth: 560, position: 'relative' }}>
            <SplitWords className="title-1-fluid" style={{ margin: 0, maxWidth: '18ch' }}>
              {copy.tagline}
            </SplitWords>
            <p className="body-large text-ink-secondary" style={{ margin: 0 }}>
              {copy.answer}
            </p>
            <Button href={site.cta.primary.href} variant="secondary" size="lg" data-cta="footer">
              {copy.cta}
            </Button>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ paddingBlock: 'var(--space-12)', display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
        <div className="footer-links">
          <div>
            <Logo variant="lockup" size={18} tagline />
          </div>
          <nav aria-labelledby="footer-product">
            <h3 id="footer-product" className="eyebrow" style={{ margin: '0 0 var(--space-3)' }}>
              {copy.groups.product.toUpperCase()}
            </h3>
            <ul className="body" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {site.nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="footer-company">
            <h3 id="footer-company" className="eyebrow" style={{ margin: '0 0 var(--space-3)' }}>
              {copy.groups.company.toUpperCase()}
            </h3>
            <ul className="body" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li>
                <a href={`mailto:${site.contact.email}`}>{copy.contact}</a>
              </li>
            </ul>
          </nav>
          <nav aria-labelledby="footer-legal">
            <h3 id="footer-legal" className="eyebrow" style={{ margin: '0 0 var(--space-3)' }}>
              {copy.groups.legal.toUpperCase()}
            </h3>
            <ul className="body" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <li>
                <a href={site.legal.privacyHref}>{copy.privacy}</a>
              </li>
              <li>
                <a href={site.legal.termsHref}>{copy.terms}</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="caption text-ink-muted" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', borderTop: '1px solid var(--line)', paddingTop: 'var(--space-5)' }}>
          <p style={{ margin: 0 }}>
            © {year} {site.legalName}
          </p>
          <p style={{ margin: 0, maxWidth: 720 }}>{copy.trademarks}</p>
        </div>
      </div>
    </footer>
  );
}
