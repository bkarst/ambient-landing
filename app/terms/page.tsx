import type { Metadata } from 'next';
import { site } from '@/config/site';
import { LegalPage } from '@/components/sections/LegalPage';

export const metadata: Metadata = {
  title: 'Terms',
  alternates: { canonical: site.legal.termsHref },
};

/** Launch blocker: the final text comes from legal and must replace this before production. */
export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="October 13, 2026">
      <p>
        This site describes {site.name}, which is in early access. Nothing on it is an offer, a price list or a commitment to ship a
        feature. Product claims describe the product as early-access customers will use it, and the section called What&apos;s next describes
        plans that are not in the product yet.
      </p>
      <p>
        Every figure on the page is sample data for a fictional company. Third-party figures are quoted with their source. Third-party
        names identify integrations and do not imply endorsement.
      </p>
      <p>
        Questions go to <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalPage>
  );
}
