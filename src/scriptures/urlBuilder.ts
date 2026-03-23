import { ScriptureBook } from './books';

const BASE_URL = 'https://www.churchofjesuschrist.org/study/scriptures';

/**
 * Convert a raw verse string into the `id` query-parameter value.
 *
 * Each bare number is prefixed with "p":
 *   "1"    → "p1"
 *   "2-4"  → "p2-p4"
 *   "9,11" → "p9,p11"
 */
function buildVerseId(verseStr: string): string {
	return verseStr.replace(/\d+/g, (n) => `p${n}`);
}

/**
 * Extract the first verse number from a verse string and prefix it with "p".
 * Used as the URL fragment anchor (e.g. "#p1").
 */
function firstVerseAnchor(verseStr: string): string {
	const m = verseStr.match(/\d+/);
	return m ? `p${m[0]}` : 'p1';
}

/**
 * Normalise a raw PMG section string (as captured by the regex) into the
 * canonical key used in `ScriptureBook.chapterMap`.
 *
 * Supported inputs (case-insensitive):
 *   "Message"              → "message"
 *   "Intro"                → "intro"
 *   "L1"–"L4"             → "3.3"–"3.6"
 *   "3B"                   → "3.2"
 *   "3.1"–"3.6"           → "3.1"–"3.6"
 *   "3" / "chapter 3" / "ch. 3" / "#3"  → "3.1"  (chapter-3 intro)
 *   "1" / "chapter 1" / "ch. 1" / "#1"  → "1"
 */
export function normalizePmgSection(raw: string): string | undefined {
	const s = raw.toLowerCase().trim();

	if (s === 'message') return 'message';
	if (s === 'intro') return 'intro';

	// Lesson shorthand: L1–L4 map to chapter-3 sections 3.3–3.6.
	// Offset 2 because: L1 → 1+2=3 → "3.3", L2 → 2+2=4 → "3.4", etc.
	const lessonMatch = s.match(/^l([1-4])$/);
	if (lessonMatch) return `3.${2 + parseInt(lessonMatch[1]!, 10)}`;

	// Letter shorthand: 3B = section 3.2 (the "invite" page).
	if (s === '3b') return '3.2';

	// Decimal notation 3.1–3.6: pass through as-is.
	const decimalMatch = s.match(/^3\.([1-6])$/);
	if (decimalMatch) return `3.${decimalMatch[1]}`;

	// Generic chapter reference (optional "chapter"/"ch."/"#" prefix + digits).
	const chapterMatch = s.match(/^(?:(?:chapter|ch\.)\s+|#\s*)?(\d+)$/);
	if (chapterMatch) {
		const n = chapterMatch[1];
		// Bare "3" (or "chapter 3" etc.) means the chapter-3 intro page.
		return n === '3' ? '3.1' : n;
	}

	return undefined;
}

/**
 * Build a ChurchOfJesusChrist.org study URL for the given reference.
 *
 * When `book.chapterMap` is present (e.g. Preach My Gospel), the chapter
 * string is normalised via `normalizePmgSection` and looked up in the map to
 * produce the correct path segment.  Verse anchors are not applied for
 * chapterMap books because PMG pages do not use paragraph-level anchors.
 *
 * Examples for standard scripture books:
 *   book=gen, chapter="9", verses=undefined
 *     → https://…/ot/gen/9?lang=eng
 *   book=gen, chapter="9", verses="1"
 *     → https://…/ot/gen/9?lang=eng&id=p1#p1
 *   book=gen, chapter="9", verses="2-4"
 *     → https://…/ot/gen/9?lang=eng&id=p2-p4#p2
 *   book=matt, chapter="5", verses="9,11"
 *     → https://…/nt/matt/5?lang=eng&id=p9,p11#p9
 *
 * Examples for Preach My Gospel:
 *   book=pmg, chapter="Message"
 *     → https://…/preach-my-gospel-2023/01-first-presidency-message?lang=eng
 *   book=pmg, chapter="3" (or "3.1")
 *     → https://…/preach-my-gospel-2023/04-chapter-3/06-chapter-3-intro?lang=eng
 *   book=pmg, chapter="L1" (or "3.3")
 *     → https://…/preach-my-gospel-2023/04-chapter-3/08-chapter-3-lesson-1?lang=eng
 */
export function buildUrl(
	book: ScriptureBook,
	chapter: string,
	verses: string | undefined,
): string {
	const base = book.urlBase ?? `${BASE_URL}/${book.volume}/${book.slug}`;

	// Books with a chapterMap (e.g. PMG) use a lookup table for URL paths.
	if (book.chapterMap) {
		const key = normalizePmgSection(chapter);
		const path = key !== undefined ? book.chapterMap[key] : undefined;
		if (path) {
			return `${base}/${path}?lang=eng`;
		}
		// Unrecognised section: fall back to a best-effort URL.
		return `${base}/${chapter}?lang=eng`;
	}

	const chapterSegment = `${book.chapterPrefix ?? ''}${chapter}`;
	const chapterUrl = `${base}/${chapterSegment}?lang=eng`;

	if (!verses) {
		return chapterUrl;
	}

	const id = buildVerseId(verses);
	const anchor = firstVerseAnchor(verses);
	return `${chapterUrl}&id=${id}#${anchor}`;
}
