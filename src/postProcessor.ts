import { SCRIPTURE_REGEX, bookByName } from './scriptures/parser';
import { buildUrl } from './scriptures/urlBuilder';

/** CSS class added to every generated scripture link. */
const LINK_CLASS = 'scripture-reference';

/**
 * Walk all text nodes inside `root`, skipping nodes that are already inside
 * an `<a>`, `<code>`, or `<pre>` element, and replace any scripture reference
 * found in the text with a hyperlink to ChurchOfJesusChrist.org.
 */
export function processScriptureReferences(root: HTMLElement): void {
	const textNodes = collectTextNodes(root);

	for (const node of textNodes) {
		linkReferencesInNode(node);
	}
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Return all text nodes under `root` that are not inside a link or code block. */
function collectTextNodes(root: HTMLElement): Text[] {
	const results: Text[] = [];

	const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
		acceptNode(node): number {
			// Skip text that lives inside an existing link, inline code, or code block.
			let el = node.parentElement;
			while (el && el !== root) {
				const tag = el.tagName;
				if (tag === 'A' || tag === 'CODE' || tag === 'PRE') {
					return NodeFilter.FILTER_REJECT;
				}
				el = el.parentElement;
			}
			return NodeFilter.FILTER_ACCEPT;
		},
	});

	let node: Node | null;
	while ((node = walker.nextNode()) !== null) {
		results.push(node as Text);
	}

	return results;
}

/**
 * Scan a single text node for scripture references and replace any found with
 * a mix of plain text nodes and `<a>` elements, in-place.
 */
function linkReferencesInNode(textNode: Text): void {
	const text = textNode.textContent ?? '';

	// Create a fresh regex instance (with reset lastIndex) for each node.
	const regex = new RegExp(SCRIPTURE_REGEX.source, SCRIPTURE_REGEX.flags);

	let lastIndex = 0;
	let match: RegExpExecArray | null;
	const parts: (string | HTMLAnchorElement)[] = [];

	while ((match = regex.exec(text)) !== null) {
		const [fullMatch, bookName, chapter, verses] = match;

		// Text before this match.
		if (match.index > lastIndex) {
			parts.push(text.slice(lastIndex, match.index));
		}

		// bookName and chapter are always present when the regex matches, but
		// TypeScript cannot infer that from the capture-group types.
		const book = bookName ? bookByName.get(bookName.toLowerCase()) : undefined;
		if (book && chapter) {
			const href = buildUrl(book, chapter, verses);
			const a = createLink(fullMatch, href);
			parts.push(a);
		} else {
			// Fallback: keep as plain text (should not happen in practice).
			parts.push(fullMatch);
		}

		lastIndex = match.index + fullMatch.length;
	}

	// Nothing matched — leave the node untouched.
	if (parts.length === 0) return;

	// Trailing text after the last match.
	if (lastIndex < text.length) {
		parts.push(text.slice(lastIndex));
	}

	// Replace the original text node with the new mixed content.
	const parent = textNode.parentNode;
	if (!parent) return;

	const fragment = document.createDocumentFragment();
	for (const part of parts) {
		fragment.appendChild(
			typeof part === 'string' ? document.createTextNode(part) : part,
		);
	}
	parent.replaceChild(fragment, textNode);
}

/** Create a styled `<a>` element that opens in a new tab. */
function createLink(label: string, href: string): HTMLAnchorElement {
	const a = document.createElement('a');
	a.href = href;
	a.textContent = label;
	a.classList.add(LINK_CLASS);
	a.setAttribute('target', '_blank');
	a.setAttribute('rel', 'noopener noreferrer');
	return a;
}
