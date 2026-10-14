#!/usr/bin/env node
/**
 * Generates styles/tokens.generated.css and config/tokens.generated.ts from the design system's
 * tokens.json. Both outputs are committed; run `node scripts/build-tokens.mjs --check` in CI to
 * fail when regenerating would change them.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'spec/ambiently-design-system/tokens.json');
const cssOut = resolve(root, 'styles/tokens.generated.css');
const tsOut = resolve(root, 'config/tokens.generated.ts');
const check = process.argv.includes('--check');

const tokens = JSON.parse(readFileSync(source, 'utf8'));
const BASE = 16;
const rem = (px) => {
  const n = parseFloat(px);
  if (Number.isNaN(n)) return px;
  const v = Math.round((n / BASE) * 10000) / 10000;
  return `${v}rem`;
};
const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

/* ---------- colour ---------- */
const themed = { dark: [], light: [] };
const colorTs = {};
for (const t of tokens.color.tokens) {
  if (typeof t.value === 'string') {
    const ref = t.value.match(/^\{(.+)\}$/);
    const v = ref ? `var(--${ref[1]})` : t.value;
    themed.dark.push([t.name, v]);
    themed.light.push([t.name, v]);
    const target = ref ? tokens.color.tokens.find((x) => x.name === ref[1]) : null;
    colorTs[t.name] = target ? { dark: target.value.dark, light: target.value.light } : { dark: t.value, light: t.value };
  } else {
    themed.dark.push([t.name, t.value.dark]);
    themed.light.push([t.name, t.value.light]);
    colorTs[t.name] = { dark: t.value.dark, light: t.value.light };
  }
}
for (const t of tokens.shadow.tokens) {
  themed.dark.push([t.name, t.value.dark]);
  themed.light.push([t.name, t.value.light]);
}

const decl = (pairs, indent = '  ') => pairs.map(([k, v]) => `${indent}--${k}: ${v};`).join('\n');

/* ---------- sizes ---------- */
const sizes = [
  ...tokens.spacing.tokens.map((t) => [t.name, rem(t.value)]),
  ...tokens.radius.tokens.map((t) => [t.name, t.value === '9999px' ? t.value : rem(t.value)]),
  ...tokens.size.tokens.map((t) => [t.name, rem(t.value)]),
];
const sizeTs = Object.fromEntries([
  ...tokens.spacing.tokens.map((t) => [t.name, parseFloat(t.value)]),
  ...tokens.radius.tokens.map((t) => [t.name, parseFloat(t.value)]),
  ...tokens.size.tokens.map((t) => [t.name, parseFloat(t.value)]),
]);

/* ---------- type ---------- */
const families = tokens.type.families;
const fontSans = `var(--font-inter), ${families.sans.replace(/^"Inter",\s*/, '')}`;
const typeClasses = [];
const typeTs = {};
for (const group of tokens.type.groups) {
  for (const s of group.styles) {
    const fam = group.family === 'mono' ? 'var(--font-mono)' : 'var(--font-sans)';
    const parts = [
      `font-family: ${fam}`,
      `font-size: ${rem(s.fontSize)}`,
      `line-height: ${rem(s.lineHeight)}`,
      `font-weight: ${s.fontWeight}`,
    ];
    if (s.letterSpacing) parts.push(`letter-spacing: ${s.letterSpacing}`);
    typeClasses.push(`.${s.name} { ${parts.join('; ')}; }`);
    typeTs[s.name] = {
      fontSize: parseFloat(s.fontSize),
      lineHeight: parseFloat(s.lineHeight),
      fontWeight: s.fontWeight,
      letterSpacing: s.letterSpacing ?? '0',
    };
  }
}

const css = `/* Generated from spec/ambiently-design-system/tokens.json by scripts/build-tokens.mjs. Do not edit. */
:root {
  color-scheme: dark;
${decl(themed.dark)}
}
@media (prefers-color-scheme: light) {
  :root:not([data-theme='dark']) {
    color-scheme: light;
${decl(themed.light, '    ')}
  }
}
:root[data-theme='light'] {
  color-scheme: light;
${decl(themed.light)}
}
:root[data-theme='dark'] {
  color-scheme: dark;
${decl(themed.dark)}
}
:root {
${decl(sizes)}
  --font-sans: ${fontSans};
  --font-mono: ${families.mono};
}
${typeClasses.join('\n')}
`;

const ts = `// Generated from spec/ambiently-design-system/tokens.json by scripts/build-tokens.mjs. Do not edit.
export const color = ${JSON.stringify(
  Object.fromEntries(Object.entries(colorTs).map(([k, v]) => [camel(k), v])),
  null,
  2,
)} as const;

export const size = ${JSON.stringify(Object.fromEntries(Object.entries(sizeTs).map(([k, v]) => [camel(k), v])), null, 2)} as const;

export const type = ${JSON.stringify(Object.fromEntries(Object.entries(typeTs).map(([k, v]) => [camel(k), v])), null, 2)} as const;
`;

if (check) {
  const same = (path, next) => existsSync(path) && readFileSync(path, 'utf8') === next;
  if (!same(cssOut, css) || !same(tsOut, ts)) {
    console.error('Generated token files are stale. Run `node scripts/build-tokens.mjs`.');
    process.exit(1);
  }
  console.log('Token files are up to date.');
} else {
  writeFileSync(cssOut, css);
  writeFileSync(tsOut, ts);
  console.log(`Wrote ${cssOut}\nWrote ${tsOut}`);
}
