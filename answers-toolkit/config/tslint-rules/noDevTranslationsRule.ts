import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
	public static FAILURE_STRING = 'devTranslations should be removed in production';

	public apply (sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new NoDevTranslationsWalker(sourceFile, this.getOptions()));
	}
}

// The walker takes care of all the work.
// tslint:disable-next-line:max-classes-per-file
class NoDevTranslationsWalker extends Lint.RuleWalker {

	visitCallExpression (node: ts.CallExpression) {
		const identifier = node.expression;
		if (identifier.kind === ts.SyntaxKind.Identifier) {
			const name = identifier.getText();
			if (name === 'devTranslations') {
				this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
			}
		}
	}
}
