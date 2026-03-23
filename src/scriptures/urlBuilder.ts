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
 * Build a ChurchOfJesusChrist.org study URL for the given reference.
 *
 * Examples:
 *   book=gen, chapter="9", verses=undefined
 *     → https://…/ot/gen/9?lang=eng
 *   book=gen, chapter="9", verses="1"
 *     → https://…/ot/gen/9?lang=eng&id=p1#p1
 *   book=gen, chapter="9", verses="2-4"
 *     → https://…/ot/gen/9?lang=eng&id=p2-p4#p2
 *   book=matt, chapter="5", verses="9,11"
 *     → https://…/nt/matt/5?lang=eng&id=p9,p11#p9
 */
export function buildUrl(
	book: ScriptureBook,
	chapter: string,
	verses: string | undefined,
): string {
	const chapterUrl = `${BASE_URL}/${book.volume}/${book.slug}/${chapter}?lang=eng`;

	if (!verses) {
		return chapterUrl;
	}

	const id = buildVerseId(verses);
	const anchor = firstVerseAnchor(verses);
	return `${chapterUrl}&id=${id}#${anchor}`;
}
