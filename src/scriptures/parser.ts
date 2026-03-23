import { SCRIPTURE_BOOKS, ScriptureBook } from './books';

/** A parsed scripture reference, ready to be turned into a URL. */
export interface ScriptureReference {
	/** The original matched text (e.g. "Gen. 9:1"). */
	matchedText: string;
	/** The resolved book definition. */
	book: ScriptureBook;
	/** Chapter number as a string (e.g. "9"). */
	chapter: string;
	/**
	 * Raw verse string exactly as written (e.g. "1", "2-4", "9,11").
	 * Undefined when only a chapter was referenced.
	 */
	verses: string | undefined;
}

// ── Regex construction ──────────────────────────────────────────────────────

/** Escape characters that are special inside a RegExp source string. */
function escapeRegex(s: string): string {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Build a map of lowercased name → book so lookups are O(1).
 * Exported so other modules can reuse it without rebuilding.
 * Populated once at module initialisation time.
 */
export const bookByName = new Map<string, ScriptureBook>();

for (const book of SCRIPTURE_BOOKS) {
	for (const name of book.names) {
		bookByName.set(name.toLowerCase(), book);
	}
}

/**
 * A single compiled RegExp that matches all scripture references.
 *
 * Capture groups:
 *   1 – book name (any recognised form)
 *   2 – chapter number
 *   3 – verse string (optional; e.g. "1", "2-4", "9,11")
 *
 * The alternation is sorted longest-first so that "Doctrine and Covenants"
 * is tried before "D&C", and "1 Nephi" before bare "N".
 */
export const SCRIPTURE_REGEX: RegExp = (() => {
	// Collect every recognised name form across all books.
	const allNames = SCRIPTURE_BOOKS.flatMap((b) => b.names);

	// Sort longest first to prevent short aliases shadowing longer ones.
	allNames.sort((a, b) => b.length - a.length);

	const bookAlt = allNames.map(escapeRegex).join('|');

	// Verse part: one or more digits optionally followed by comma- or
	// hyphen-separated additional digit groups (e.g. "1", "2-4", "9,11").
	const versePart = String.raw`\d+(?:[-,]\d+)*`;

	// After the book name, optionally allow "page N", "pg. N", or "#N"
	// in addition to the bare "N" used by standard scripture references.
	// This supports formats like "PMG page 18", "PMG pg. 18", "PMG #18".
	const numberPrefix = String.raw`(?:(?:page|pg\.)\s+|#\s*)?`;

	return new RegExp(
		String.raw`\b(${bookAlt})\s+${numberPrefix}(\d+)(?::(${versePart}))?`,
		'gi',
	);
})();

// ── Parsing ──────────────────────────────────────────────────────────────────

/**
 * Parse all scripture references found in `text`.
 * Returns an array of matches in the order they appear.
 */
export function parseReferences(text: string): ScriptureReference[] {
	const results: ScriptureReference[] = [];
	const regex = new RegExp(SCRIPTURE_REGEX.source, SCRIPTURE_REGEX.flags);

	let match: RegExpExecArray | null;
	while ((match = regex.exec(text)) !== null) {
		const [matchedText, bookName, chapter, verses] = match;

		// bookName and chapter are always present when the regex matches, but
		// TypeScript cannot infer that from the capture-group types.
		if (!bookName || !chapter) continue;

		const book = bookByName.get(bookName.toLowerCase());
		if (!book) continue; // should never happen — regex is built from bookByName keys

		results.push({
			matchedText,
			book,
			chapter,
			verses,
		});
	}

	return results;
}
