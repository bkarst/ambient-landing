import { site, integrationNames } from '@/config/site';
import { faq } from '@/content/faq';

export function GET() {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} is ${site.category}. Integrations: ${integrationNames}.`,
    '',
    '## Pages',
    '',
    `- [Home](${site.url}/): dashboards, how it works, trust, FAQ and an early-access form.`,
    `- [Privacy](${site.url}${site.legal.privacyHref})`,
    `- [Terms](${site.url}${site.legal.termsHref})`,
    '',
    '## Questions and answers',
    '',
    ...faq.flatMap((q) => [`### ${q.question}`, '', q.answer, '']),
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
