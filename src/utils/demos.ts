// Joins the demo list (src/data/demos.ts) with the result of the last browser check
// (src/data/demo-check.json, written by scripts/capture-demo-shots.mjs). Only pages that
// passed are linked anywhere on the site.
import { demos, demoGroups, demoSlug, demoUrl, featuredDemos, type Demo, type DemoGroup } from '../data/demos';
import check from '../data/demo-check.json';

const results = (check as { pages: Record<string, { ok: boolean; problems: string[] }> }).pages;

export const isLive = (path: string): boolean => Boolean(results[path]?.ok);

/** The live demo URL for a path, or undefined when the page did not pass its check. */
export const liveDemoUrl = (path?: string): string | undefined => (path && isLive(path) ? demoUrl(path) : undefined);

export const liveDemos: Demo[] = demos.filter((d) => isLive(d.path));

export interface DemoCard {
  path: string;
  title: string;
  line: string;
  url: string;
  image: string;
  alt: string;
  /** Every page of the card, when it has more than one. */
  variants: { tab: string; title: string; url: string }[];
}

export interface DemoSection extends DemoGroup {
  cards: DemoCard[];
  /** Live demo pages in the group (a card can hold several). */
  count: number;
}

/** The card of a demo: the page itself, or (should it fail its check) its first live variant. */
function toCard(main: Demo): DemoCard | null {
  const pages = [main, ...demos.filter((d) => d.of === main.path)].filter((d) => isLive(d.path));
  if (!pages.length) return null;
  const first = pages[0];
  return {
    path: first.path,
    title: main.card ?? main.title,
    line: main.line ?? main.description,
    url: demoUrl(first.path),
    image: `/images/demos/${demoSlug(first.path)}.webp`,
    alt: `Screenshot: ${first.shot}`,
    variants: pages.length > 1 ? pages.map((d) => ({ tab: d.tab ?? d.title, title: d.title, url: demoUrl(d.path) })) : [],
  };
}

const isCard = (c: DemoCard | null): c is DemoCard => c !== null;

export const demoSections: DemoSection[] = demoGroups
  .map((group) => ({
    ...group,
    cards: demos.filter((d) => d.group === group.id && !d.of).map(toCard).filter(isCard),
    count: liveDemos.filter((d) => d.group === group.id).length,
  }))
  .filter((s) => s.cards.length > 0);

/** The "Start here" row: one page each, without the variants. */
export const startHere: DemoCard[] = featuredDemos
  .map((p) => demos.find((d) => d.path === p))
  .map((d) => (d && isLive(d.path) ? toCard(d) : null))
  .filter(isCard)
  .map((c) => ({ ...c, variants: [] }));

export const demoCheck = check as { checked: string; passed: number; total: number };
