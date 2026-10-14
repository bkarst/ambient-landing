import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { SiteFooter } from '@/components/sections/SiteFooter';

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <SiteHeader minimal />
      <main id="content" className="wrap" style={{ paddingBlock: 'var(--space-16)' }}>
        <article className="measure" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <p className="caption text-ink-muted" style={{ margin: 0 }}>
            Last updated {updated}
          </p>
          <h1 className="title-1-fluid" style={{ margin: 0 }}>
            {title}
          </h1>
          <div className="body-large text-ink-secondary legal-body">{children}</div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
