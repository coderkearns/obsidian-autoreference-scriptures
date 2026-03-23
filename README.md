# Autoreference Scriptures

An [Obsidian](https://obsidian.md) plugin that automatically detects scripture references in your notes and turns them into hyperlinks to the [ChurchOfJesusChrist.org](https://www.churchofjesuschrist.org) study library — no configuration required.

## Features

- **Automatic detection** – works in Reading View without any manual action
- **Full and abbreviated forms** – recognizes full names and common abbreviations (e.g. `Gen.`, `1 Ne.`, `D&C`)
- **Verse ranges and lists** – supports `John 3:16`, `Alma 32:21-43`, and `Matthew 5:3,5,7`
- **Skips code blocks** – references inside inline code or fenced code blocks are left unchanged
- **Supported volumes**:
  - Old Testament
  - New Testament
  - Book of Mormon
  - Doctrine & Covenants
  - Pearl of Great Price
  - Preach My Gospel (page references via `PMG page 18` or `PMG #18`)

## How it works

When you open a note in Reading View, the plugin scans all rendered text and wraps any detected scripture reference in a clickable link that opens the corresponding chapter or verse on ChurchOfJesusChrist.org in a new tab.

## Examples

| Note text | Destination |
|-----------|-------------|
| `John 3:16` | `…/nt/john/3?lang=eng&id=p16#p16` |
| `Gen. 1:1` | `…/ot/gen/1?lang=eng&id=p1#p1` |
| `1 Ne. 3:7` | `…/bofm/1-ne/3?lang=eng&id=p7#p7` |
| `D&C 76:22-24` | `…/dc-testament/dc/76?lang=eng&id=p22-p24#p22` |
| `Alma 32:21` | `…/bofm/alma/32?lang=eng&id=p21#p21` |
| `PMG page 1` | `…/preach-my-gospel…/chapter-1?lang=eng` |

## Installation

### Via Obsidian Community Plugins *(coming soon)*

1. Open **Settings → Community Plugins** and disable Safe Mode if prompted.
2. Click **Browse**, search for **Autoreference Scriptures**, and install it.
3. Enable the plugin.

### Manual installation

1. Download `main.js` and `manifest.json` from the [latest release](https://github.com/coderkearns/obsidian-autoreference-scriptures/releases/latest).
2. Copy those files into your vault at:
   ```
   <vault>/.obsidian/plugins/obsidian-autoreference-scriptures/
   ```
3. Enable the plugin in **Settings → Community Plugins**.

## Development

```bash
npm install       # install dependencies
npm run dev       # watch mode — rebuilds automatically on save
npm run build     # type-check + production bundle
npm run lint      # run ESLint
```

## Releasing a new version

1. Update `minAppVersion` in `manifest.json` if you are using newer Obsidian APIs.
2. Run `npm version patch` (or `minor` / `major`) — this bumps the version in `manifest.json`, `package.json`, and `versions.json` automatically.
3. Create a GitHub release using the version number as the tag (no `v` prefix).
4. Attach `main.js` and `manifest.json` as binary assets.

## License

[ISC](LICENSE) © coderkearns
