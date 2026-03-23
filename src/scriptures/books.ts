/**
 * Canonical list of all supported scripture books.
 * Each book defines the recognized name forms (full name and abbreviations),
 * the volume segment used in ChurchOfJesusChrist.org URLs, and the book slug.
 *
 * To add a new book, simply add an entry here — no other file needs to change.
 */

export interface ScriptureBook {
	/** All recognized name forms: full name first, then abbreviations. */
	names: string[];
	/** Volume path segment used in ChurchOfJesusChrist.org study URLs. */
	volume: string;
	/** Book path segment used in ChurchOfJesusChrist.org study URLs. */
	slug: string;
	/**
	 * Optional override for the base URL up to (but not including) the
	 * chapter segment. When present, replaces the default
	 * `BASE_URL/volume/slug` construction in the URL builder.
	 */
	urlBase?: string;
	/**
	 * Optional prefix inserted before the chapter number in the URL
	 * (e.g. `"chapter-"` turns chapter `1` into the path segment `chapter-1`).
	 */
	chapterPrefix?: string;
	/**
	 * Optional map from a normalized section key to the URL path segment
	 * appended after `urlBase`. When present, the URL builder resolves the
	 * chapter via this map instead of the default `chapterPrefix + chapter`
	 * construction.  Keys use the canonical forms returned by
	 * `normalizePmgSection` (e.g. `"message"`, `"intro"`, `"1"`, `"3.1"`,
	 * `"3.2"`, …).
	 */
	chapterMap?: Record<string, string>;
}

export const SCRIPTURE_BOOKS: ScriptureBook[] = [
	// ── Old Testament ──────────────────────────────────────────────────────────
	{ names: ['Genesis', 'Gen.', 'Gen'], volume: 'ot', slug: 'gen' },
	{ names: ['Exodus', 'Exod.', 'Exod', 'Ex.', 'Ex'], volume: 'ot', slug: 'ex' },
	{ names: ['Leviticus', 'Lev.', 'Lev'], volume: 'ot', slug: 'lev' },
	{ names: ['Numbers', 'Num.', 'Num'], volume: 'ot', slug: 'num' },
	{ names: ['Deuteronomy', 'Deut.', 'Deut'], volume: 'ot', slug: 'deut' },
	{ names: ['Joshua', 'Josh.', 'Josh'], volume: 'ot', slug: 'josh' },
	{ names: ['Judges', 'Judg.', 'Judg'], volume: 'ot', slug: 'judg' },
	{ names: ['Ruth'], volume: 'ot', slug: 'ruth' },
	{ names: ['1 Samuel', '1 Sam.', '1 Sam'], volume: 'ot', slug: '1-sam' },
	{ names: ['2 Samuel', '2 Sam.', '2 Sam'], volume: 'ot', slug: '2-sam' },
	{ names: ['1 Kings', '1 Kgs.', '1 Kgs'], volume: 'ot', slug: '1-kgs' },
	{ names: ['2 Kings', '2 Kgs.', '2 Kgs'], volume: 'ot', slug: '2-kgs' },
	{ names: ['1 Chronicles', '1 Chr.', '1 Chr'], volume: 'ot', slug: '1-chr' },
	{ names: ['2 Chronicles', '2 Chr.', '2 Chr'], volume: 'ot', slug: '2-chr' },
	{ names: ['Ezra'], volume: 'ot', slug: 'ezra' },
	{ names: ['Nehemiah', 'Neh.', 'Neh'], volume: 'ot', slug: 'neh' },
	{ names: ['Esther', 'Esth.', 'Esth'], volume: 'ot', slug: 'esth' },
	{ names: ['Job'], volume: 'ot', slug: 'job' },
	{ names: ['Psalms', 'Psalm', 'Ps.', 'Ps'], volume: 'ot', slug: 'ps' },
	{ names: ['Proverbs', 'Prov.', 'Prov'], volume: 'ot', slug: 'prov' },
	{ names: ['Ecclesiastes', 'Eccl.', 'Eccl'], volume: 'ot', slug: 'eccl' },
	{ names: ['Song of Solomon', 'Song of Songs', 'Song'], volume: 'ot', slug: 'song' },
	{ names: ['Isaiah', 'Isa.', 'Isa'], volume: 'ot', slug: 'isa' },
	{ names: ['Jeremiah', 'Jer.', 'Jer'], volume: 'ot', slug: 'jer' },
	{ names: ['Lamentations', 'Lam.', 'Lam'], volume: 'ot', slug: 'lam' },
	{ names: ['Ezekiel', 'Ezek.', 'Ezek'], volume: 'ot', slug: 'ezek' },
	{ names: ['Daniel', 'Dan.', 'Dan'], volume: 'ot', slug: 'dan' },
	{ names: ['Hosea', 'Hos.', 'Hos'], volume: 'ot', slug: 'hosea' },
	{ names: ['Joel'], volume: 'ot', slug: 'joel' },
	{ names: ['Amos'], volume: 'ot', slug: 'amos' },
	{ names: ['Obadiah', 'Obad.', 'Obad'], volume: 'ot', slug: 'obad' },
	{ names: ['Jonah', 'Jon.', 'Jon'], volume: 'ot', slug: 'jonah' },
	{ names: ['Micah', 'Mic.', 'Mic'], volume: 'ot', slug: 'micah' },
	{ names: ['Nahum', 'Nah.', 'Nah'], volume: 'ot', slug: 'nahum' },
	{ names: ['Habakkuk', 'Hab.', 'Hab'], volume: 'ot', slug: 'hab' },
	{ names: ['Zephaniah', 'Zeph.', 'Zeph'], volume: 'ot', slug: 'zeph' },
	{ names: ['Haggai', 'Hag.', 'Hag'], volume: 'ot', slug: 'hag' },
	{ names: ['Zechariah', 'Zech.', 'Zech'], volume: 'ot', slug: 'zech' },
	{ names: ['Malachi', 'Mal.', 'Mal'], volume: 'ot', slug: 'mal' },

	// ── New Testament ──────────────────────────────────────────────────────────
	{ names: ['Matthew', 'Matt.', 'Matt'], volume: 'nt', slug: 'matt' },
	{ names: ['Mark'], volume: 'nt', slug: 'mark' },
	{ names: ['Luke'], volume: 'nt', slug: 'luke' },
	{ names: ['John'], volume: 'nt', slug: 'john' },
	{ names: ['Acts'], volume: 'nt', slug: 'acts' },
	{ names: ['Romans', 'Rom.', 'Rom'], volume: 'nt', slug: 'rom' },
	{ names: ['1 Corinthians', '1 Cor.', '1 Cor'], volume: 'nt', slug: '1-cor' },
	{ names: ['2 Corinthians', '2 Cor.', '2 Cor'], volume: 'nt', slug: '2-cor' },
	{ names: ['Galatians', 'Gal.', 'Gal'], volume: 'nt', slug: 'gal' },
	{ names: ['Ephesians', 'Eph.', 'Eph'], volume: 'nt', slug: 'eph' },
	{ names: ['Philippians', 'Philip.', 'Philip', 'Phil.', 'Phil'], volume: 'nt', slug: 'philip' },
	{ names: ['Colossians', 'Col.', 'Col'], volume: 'nt', slug: 'col' },
	{ names: ['1 Thessalonians', '1 Thes.', '1 Thes'], volume: 'nt', slug: '1-thes' },
	{ names: ['2 Thessalonians', '2 Thes.', '2 Thes'], volume: 'nt', slug: '2-thes' },
	{ names: ['1 Timothy', '1 Tim.', '1 Tim'], volume: 'nt', slug: '1-tim' },
	{ names: ['2 Timothy', '2 Tim.', '2 Tim'], volume: 'nt', slug: '2-tim' },
	{ names: ['Titus', 'Tit.', 'Tit'], volume: 'nt', slug: 'titus' },
	{ names: ['Philemon', 'Philem.', 'Philem'], volume: 'nt', slug: 'philem' },
	{ names: ['Hebrews', 'Heb.', 'Heb'], volume: 'nt', slug: 'heb' },
	{ names: ['James', 'Jas.', 'Jas'], volume: 'nt', slug: 'james' },
	{ names: ['1 Peter', '1 Pet.', '1 Pet'], volume: 'nt', slug: '1-pet' },
	{ names: ['2 Peter', '2 Pet.', '2 Pet'], volume: 'nt', slug: '2-pet' },
	{ names: ['1 John', '1 Jn.', '1 Jn'], volume: 'nt', slug: '1-jn' },
	{ names: ['2 John', '2 Jn.', '2 Jn'], volume: 'nt', slug: '2-jn' },
	{ names: ['3 John', '3 Jn.', '3 Jn'], volume: 'nt', slug: '3-jn' },
	{ names: ['Jude'], volume: 'nt', slug: 'jude' },
	{ names: ['Revelation', 'Rev.', 'Rev'], volume: 'nt', slug: 'rev' },

	// ── Book of Mormon ─────────────────────────────────────────────────────────
	{ names: ['1 Nephi', '1 Ne.', '1 Ne'], volume: 'bofm', slug: '1-ne' },
	{ names: ['2 Nephi', '2 Ne.', '2 Ne'], volume: 'bofm', slug: '2-ne' },
	{ names: ['Jacob'], volume: 'bofm', slug: 'jacob' },
	{ names: ['Enos'], volume: 'bofm', slug: 'enos' },
	{ names: ['Jarom'], volume: 'bofm', slug: 'jarom' },
	{ names: ['Omni'], volume: 'bofm', slug: 'omni' },
	{ names: ['Words of Mormon', 'W of M'], volume: 'bofm', slug: 'w-of-m' },
	{ names: ['Mosiah'], volume: 'bofm', slug: 'mosiah' },
	{ names: ['Alma'], volume: 'bofm', slug: 'alma' },
	{ names: ['Helaman', 'Hel.', 'Hel'], volume: 'bofm', slug: 'hel' },
	{ names: ['3 Nephi', '3 Ne.', '3 Ne'], volume: 'bofm', slug: '3-ne' },
	{ names: ['4 Nephi', '4 Ne.', '4 Ne'], volume: 'bofm', slug: '4-ne' },
	{ names: ['Mormon', 'Morm.', 'Morm'], volume: 'bofm', slug: 'morm' },
	{ names: ['Ether'], volume: 'bofm', slug: 'ether' },
	{ names: ['Moroni', 'Moro.', 'Moro'], volume: 'bofm', slug: 'moro' },

	// ── Doctrine and Covenants ─────────────────────────────────────────────────
	// List "Doctrine and Covenants" / "Doctrine & Covenants" before "D&C" so
	// the longer forms are tried first in the regex alternation.
	{
		names: ['Doctrine and Covenants', 'Doctrine & Covenants', 'D&C'],
		volume: 'dc-testament',
		slug: 'dc',
	},

	// ── Pearl of Great Price ───────────────────────────────────────────────────
	{ names: ['Moses'], volume: 'pgp', slug: 'moses' },
	{ names: ['Abraham', 'Abr.', 'Abr'], volume: 'pgp', slug: 'abr' },
	{ names: ['Joseph Smith—Matthew', 'JS—M', 'JS-M'], volume: 'pgp', slug: 'js-m' },
	{ names: ['Joseph Smith—History', 'JS—H', 'JS-H'], volume: 'pgp', slug: 'js-h' },
	{ names: ['Articles of Faith', 'A of F'], volume: 'pgp', slug: 'a-of-f' },

	// ── Preach My Gospel ───────────────────────────────────────────────────────
	// List "Preach My Gospel" before the shorter alias "PMG" so the longer form
	// is tried first in the regex alternation.
	{
		names: ['Preach My Gospel', 'PMG'],
		volume: 'manual',
		slug: 'preach-my-gospel-2023',
		urlBase: 'https://www.churchofjesuschrist.org/study/manual/preach-my-gospel-2023',
		chapterMap: {
			'message': '01-first-presidency-message',
			'intro':   '02-intro',
			'1':       '03-chapter-1',
			'2':       '04-chapter-2',
			'3.1':     '04-chapter-3/06-chapter-3-intro',
			'3.2':     '04-chapter-3/07-chapter-3-invite',
			'3.3':     '04-chapter-3/08-chapter-3-lesson-1',
			'3.4':     '04-chapter-3/09-chapter-3-lesson-2',
			'3.5':     '04-chapter-3/10-chapter-3-lesson-3',
			'3.6':     '04-chapter-3/11-chapter-3-lesson-4',
			'4':       '12-chapter-4',
			'5':       '13-chapter-5',
			'6':       '14-chapter-6',
			'7':       '15-chapter-7',
			'8':       '16-chapter-8',
			'9':       '17-chapter-9',
			'10':      '18-chapter-10',
			'11':      '19-chapter-11',
			'12':      '20-chapter-12',
			'13':      '21-chapter-13',
		},
	},
];
