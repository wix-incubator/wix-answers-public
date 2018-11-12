import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
	public static FAILURE_STRING = 'tests cannot be skipped without a commented Jira';

	public apply (sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new NoSkippedTestsWalker(sourceFile, this.getOptions()));
	}
}

const containsJira = (text: string) => {
	return /https:\/\/jira.wixpress.com\/browse\//.test(text);
};

// The walker takes care of all the work.
// tslint:disable-next-line:max-classes-per-file
class NoSkippedTestsWalker extends Lint.RuleWalker {

	visitPropertyAccessExpression (node: ts.PropertyAccessExpression) {
		const name = node.getText();
		if (name === 'it.skip' || name === 'describe.skip') {
			const source = node.getSourceFile();
			const prevTextWidth = node.getLeadingTriviaWidth();
			const previousText = source.getFullText().slice(node.pos, node.pos + prevTextWidth);

			if (containsJira(previousText)) {
				return;
			}
			this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
		}
	}
}
