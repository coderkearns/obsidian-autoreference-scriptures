import { Plugin } from 'obsidian';
import { processScriptureReferences } from './postProcessor';

export default class ScriptureReferencePlugin extends Plugin {
	async onload() {
		// Register a post-processor that runs whenever Obsidian renders markdown
		// in Reading View.  It walks the rendered HTML and wraps any scripture
		// references it finds with hyperlinks to ChurchOfJesusChrist.org.
		this.registerMarkdownPostProcessor((el) => {
			processScriptureReferences(el);
		});
	}

	onunload() {
		// Nothing to clean up — registerMarkdownPostProcessor handles teardown.
	}
}
