import { site } from '@/config/site';
import { landing } from '@/content/landing';
import { Logo } from '@/components/ds/Logo';
import { HeaderController } from './HeaderController';
import { ThemeToggle } from './ThemeToggle';

/**
 * Sticky translucent header (§5.2). The lockup links to the top, the in-page nav shows at regular and
 * wide widths, and the CTA renders as secondary while the hero CTA or the form is on screen so the page
 * never shows two primary buttons at once.
 */
export function SiteHeader({ minimal = false }: { minimal?: boolean }) {
  const home = minimal ? '/' : '#top';
  return (
    <>
      <a href="#content" className="skip-link amb-btn is-secondary is-sm">
        {landing.skipLink}
      </a>
      <header className="site-header" data-cta="secondary">
        <div className="wrap site-header-inner">
          <a href={home} aria-label={site.name} style={{ display: 'inline-flex', textDecoration: 'none' }}>
            <Logo variant="lockup" size={24} />
          </a>
          {!minimal && (
            <nav className="site-nav hidden md:flex" aria-label="Page sections" style={{ gap: 4 }}>
              {site.nav.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <ThemeToggle />
            <a href={minimal ? `/${site.cta.primary.href}` : site.cta.primary.href} className="amb-btn is-sm is-secondary" data-header-cta>
              <span>{site.cta.primary.label}</span>
            </a>
          </div>
        </div>
        <HeaderController />
      </header>
    </>
  );
}
