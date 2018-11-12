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
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoDevTranslationsWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = 'devTranslations should be removed in production';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
// The walker takes care of all the work.
// tslint:disable-next-line:max-classes-per-file
var NoDevTranslationsWalker = /** @class */ (function (_super) {
    __extends(NoDevTranslationsWalker, _super);
    function NoDevTranslationsWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoDevTranslationsWalker.prototype.visitCallExpression = function (node) {
        var identifier = node.expression;
        if (identifier.kind === ts.SyntaxKind.Identifier) {
            var name_1 = identifier.getText();
            if (name_1 === 'devTranslations') {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
            }
        }
    };
    return NoDevTranslationsWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=noDevTranslationsRule.js.map