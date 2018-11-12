"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoSkippedTestsWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = 'tests cannot be skipped without a commented Jira';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var containsJira = function (text) {
    return /https:\/\/jira.wixpress.com\/browse\//.test(text);
};
// The walker takes care of all the work.
// tslint:disable-next-line:max-classes-per-file
var NoSkippedTestsWalker = /** @class */ (function (_super) {
    __extends(NoSkippedTestsWalker, _super);
    function NoSkippedTestsWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoSkippedTestsWalker.prototype.visitPropertyAccessExpression = function (node) {
        var name = node.getText();
        if (name === 'it.skip' || name === 'describe.skip') {
            var source = node.getSourceFile();
            var prevTextWidth = node.getLeadingTriviaWidth();
            var previousText = source.getFullText().slice(node.pos, node.pos + prevTextWidth);
            if (containsJira(previousText)) {
                return;
            }
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    };
    return NoSkippedTestsWalker;
}(Lint.RuleWalker));
