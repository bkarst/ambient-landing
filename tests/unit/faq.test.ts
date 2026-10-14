import { describe, expect, it } from 'vitest';
import { faq } from '@/content/faq';
import { site } from '@/config/site';

const BANNED = ['Ambient Work', 'router', 'proxy', 'harness', 'LiteLLM', 'ChatGPT'];

describe('faq', () => {
  it('has ten entries with unique ids', () => {
    expect(faq).toHaveLength(10);
    expect(new Set(faq.map((f) => f.id)).size).toBe(10);
  });
  it('names every integration in the tools answer', () => {
    const answer = faq.find((f) => f.id === 'which-tools')!.answer;
    for (const i of site.integrations) expect(answer).toContain(i.name);
    expect(answer).toContain('OpenCode');
    expect(answer).toBe(
      'Coding agents first: Claude Code, Codex, Cursor and OpenCode, with GitHub Copilot next. AI spend from Anthropic, Microsoft, Cursor, OpenAI and GitHub. Work context from GitHub, Jira, monday.com and Notion. More are on the way.',
    );
  });
  it('never uses banned vocabulary', () => {
    for (const f of faq) {
      for (const word of BANNED) {
        expect(`${f.question} ${f.answer}`.toLowerCase()).not.toContain(word.toLowerCase());
      }
    }
  });
  it('reads the product name from config', () => {
    expect(faq[0].question).toBe(`What is ${site.name}?`);
    for (const f of faq) expect(f.answer.length).toBeGreaterThan(20);
  });
});
