import { SiteHeader } from '@/components/sections/SiteHeader';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { Button } from '@/components/ds/Button';
import { Logo } from '@/components/ds/Logo';

export default function NotFound() {
  return (
    <>
      <SiteHeader minimal />
      <main id="content" className="wrap" style={{ paddingBlock: 'var(--space-16)', minHeight: '60svh' }}>
        <div className="measure" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'flex-start' }}>
          <Logo variant="mark" size={64} />
          <h1 className="title-1-fluid" style={{ margin: 0 }}>
            Nothing here.
          </h1>
          <p className="body-large text-ink-secondary" style={{ margin: 0 }}>
            The page you asked for does not exist. The receipts are on the home page.
          </p>
          <Button href="/" variant="secondary" size="lg">
            Go home
          </Button>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
