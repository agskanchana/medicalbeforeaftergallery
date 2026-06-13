import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type DocEntry = CollectionEntry<'docs'>;

export interface DocGroup {
  name: string;
  order: number;
  items: DocEntry[];
}

export async function getDocsTree(): Promise<DocGroup[]> {
  const docs = await getCollection('docs', ({ data }) => !data.draft);
  const groups = new Map<string, DocGroup>();

  for (const doc of docs) {
    const existing = groups.get(doc.data.group);
    if (existing) {
      existing.order = Math.min(existing.order, doc.data.groupOrder);
      existing.items.push(doc);
    } else {
      groups.set(doc.data.group, { name: doc.data.group, order: doc.data.groupOrder, items: [doc] });
    }
  }

  const tree = [...groups.values()];
  tree.forEach((g) =>
    g.items.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title))
  );
  tree.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  return tree;
}

// Flattened, ordered list — used for prev/next navigation.
export async function getDocsFlat(): Promise<DocEntry[]> {
  const tree = await getDocsTree();
  return tree.flatMap((g) => g.items);
}
