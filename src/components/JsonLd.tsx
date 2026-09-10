import { graphJson, type LdNode } from '@/lib/knowledge-graph';

/**
 * JsonLd — the ONE JSON-LD script a page emits (addendum §3b): all of the
 * page's nodes in a single interlinked @graph. Pass plain node objects; any
 * stray `@context` on a node is stripped and declared once at the top.
 */
export function JsonLd({ nodes }: { nodes: LdNode[] }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graphJson(nodes) }} />
  );
}
