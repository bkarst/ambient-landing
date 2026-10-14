import type { Metadata } from 'next';
import { site } from '@/config/site';
import { LegalPage } from '@/components/sections/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy policy',
  alternates: { canonical: site.legal.privacyHref },
};

/**
 * Launch blocker (spec §9.5): the final text comes from legal. This page states what the site does today
 * so the interest form has somewhere to point, and must be replaced before production.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="October 13, 2026">
      <p>
        {site.name} uses the answers you give in the request-access form only to reply to you about early access. We keep them for
        12 months and then delete them.
      </p>
      <p>
        The form records your work email, your message, the optional company-size and spend answers, and the campaign tags in the
        link you arrived from. To limit abuse, submissions are rate-limited by a one-way hash of your network address. The address
        itself is not stored.
      </p>
      <p>
        This site sets no cookies and loads no third-party scripts, fonts or trackers. Every number shown on the page is sample data for a
        fictional company.
      </p>
      <p>
        To ask about or delete your data, write to <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalPage>
  );
}
