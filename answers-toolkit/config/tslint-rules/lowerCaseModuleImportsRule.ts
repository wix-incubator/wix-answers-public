import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
	public static FAILURE_STRING = 'external module name must be lowercase';

	public apply (sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
	}
}

// The walker takes care of all the work.
// tslint:disable-next-line:max-classes-per-file
class NoImportsWalker extends Lint.RuleWalker {

	visitImportDeclaration (node: ts.ImportDeclaration) {
		// create a failure at the current position
		const moduleSpecifier = node.moduleSpecifier;
		const moduleName = moduleSpecifier.getText();
		const isRelative = moduleName.charAt(0) === '.';

		const moduleNameStart = moduleSpecifier.getStart();
		const moduleNameWidth = moduleSpecifier.getWidth();

		const fix = new Lint.Replacement(moduleNameStart, moduleNameWidth, moduleName.toLocaleLowerCase());

		if (!isRelative && moduleName !== moduleName.toLowerCase()) {
			this.addFailure(this.createFailure(moduleNameStart, moduleNameWidth, Rule.FAILURE_STRING, fix));
		}

		// call the base version of this visitor to actually parse this node
		super.visitImportDeclaration(node);
	}
}
