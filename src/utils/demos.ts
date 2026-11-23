// Joins the demo list (src/data/demos.ts) with the result of the last browser check
// (src/data/demo-check.json, written by scripts/capture-demo-shots.mjs). Only pages that
// passed are linked anywhere on the site.
import { demos, demoGroups, demoSlug, demoUrl, type Demo, type DemoGroup } from '../data/demos';
import check from '../data/demo-check.json';

const results = (check as { pages: Record<string, { ok: boolean; problems: string[] }> }).pages;

export const isLive = (path: string): boolean => Boolean(results[path]?.ok);

/** The live demo URL for a path, or undefined when the page did not pass its check. */
export const liveDemoUrl = (path?: string): string | undefined => (path && isLive(path) ? demoUrl(path) : undefined);

export const liveDemos: Demo[] = demos.filter((d) => isLive(d.path));

export interface DemoSection extends DemoGroup {
  families: { name: string; items: (Demo & { url: string; image: string })[] }[];
  count: number;
}

export const demoSections: DemoSection[] = demoGroups
  .map((group) => {
    const items = liveDemos
      .filter((d) => d.group === group.id)
      .map((d) => ({ ...d, url: demoUrl(d.path), image: `/images/demos/${demoSlug(d.path)}.webp` }));
    const families: DemoSection['families'] = [];
    for (const item of items) {
      let fam = families.find((f) => f.name === item.family);
      if (!fam) families.push((fam = { name: item.family, items: [] }));
      fam.items.push(item);
    }
    return { ...group, families, count: items.length };
  })
  .filter((s) => s.count > 0);

export const demoCheck = check as { checked: string; passed: number; total: number };
