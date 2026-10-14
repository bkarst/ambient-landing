/**
 * Copy is centralised (spec §3.4) and uses the buyer's vocabulary (§2.3). These tests grep the source so
 * the rules hold as the code grows.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { site } from '@/config/site';
import { landing } from '@/content/landing';
import { faq } from '@/content/faq';

const root = join(__dirname, '..', '..');

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(entry)) out.push(p);
  }
  return out;
}

const allowed = (file: string) => {
  const rel = relative(root, file).replace(/\\/g, '/');
  return (
    rel.startsWith('config/') ||
    rel.startsWith('content/') ||
    rel.startsWith('components/integrations/logos/') ||
    rel.startsWith('components/ds/Logo.tsx') ||
    rel.endsWith('.test.ts')
  );
};

describe('copy is centralised', () => {
  const files = [...walk(join(root, 'components')), ...walk(join(root, 'app'))].filter((f) => !allowed(f));
  const literals = [site.name, site.taglines.hero, site.taglines.footer, site.taglines.brand, ...site.integrations.map((i) => i.name)];

  it('no brand name, tagline or integration name is hard-coded outside config/ and content/', () => {
    const offenders: string[] = [];
    for (const file of files) {
      const src = readFileSync(file, 'utf8');
      for (const literal of literals) {
        // A literal inside a string, not an identifier (e.g. `Ambiently` in a comment or JSX text).
        const re = new RegExp(`(["'\`>])\\s*${literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
        for (const line of src.split('\n')) {
          if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
          if (re.test(line)) offenders.push(`${relative(root, file)}: ${literal}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});

describe('vocabulary', () => {
  // Citation ids (e.g. harnessNoOwner) name the publisher Harness, which is a source, not the product's internal term.
  const strip = (v: unknown) => JSON.stringify(v, (key, value) => (key === 'sourceId' ? undefined : value));
  const corpus = strip(landing) + strip(faq) + strip(site);
  const banned = ['Ambient Work', 'router', 'proxy', 'LiteLLM', 'ChatGPT', 'leaderboard score', 'productivity score'];

  it.each(banned)('never says %s', (word) => {
    expect(corpus.toLowerCase()).not.toContain(word.toLowerCase());
  });

  it('never calls a tool a harness (the publisher Harness is a citation)', () => {
    expect(corpus).not.toMatch(/\bharness\b/);
  });
});

describe("What's next containment (§6.10)", () => {
  const phrases = ['idle seats', 'model routing', 'budgets by vendor', 'fix available', 'the right model', 'thresholds you choose'];
  const next = JSON.stringify(landing.whatsNext).toLowerCase();
  const rest = JSON.stringify({ ...landing, whatsNext: undefined }).toLowerCase() + JSON.stringify(faq).toLowerCase();

  it.each(phrases)('"%s" appears only in the What\'s next block', (phrase) => {
    expect(rest).not.toContain(phrase);
  });

  it('the block says these are not built yet', () => {
    expect(next).toContain('none of them ships yet');
    expect(landing.whatsNext.badge).toBe('Planned');
  });
});

describe('fixed copy (§4.1)', () => {
  it('hero and footer taglines are verbatim', () => {
    expect(site.taglines.hero).toBe('AI tokens are money, you want receipts, right?');
    expect(site.taglines.footer).toBe('Do you know what tasks are your employees using AI for?');
    expect(landing.hero.headline).toBe(site.taglines.hero);
    expect(landing.footer.tagline).toBe(site.taglines.footer);
  });

  it('the description fits a search snippet', () => {
    expect(site.description.length).toBeLessThanOrEqual(160);
    expect(site.seo.title.length).toBeLessThanOrEqual(60);
  });
});
