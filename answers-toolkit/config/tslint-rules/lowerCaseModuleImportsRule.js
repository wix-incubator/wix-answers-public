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
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = 'external module name must be lowercase';
exports.Rule = Rule;
// The walker takes care of all the work.
// tslint:disable-next-line:max-classes-per-file
var NoImportsWalker = (function (_super) {
    __extends(NoImportsWalker, _super);
    function NoImportsWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoImportsWalker.prototype.visitImportDeclaration = function (node) {
        // create a failure at the current position
        var moduleSpecifier = node.moduleSpecifier;
        var moduleName = moduleSpecifier.getText();
        var isRelative = moduleName.charAt(0) === '.';
        var moduleNameStart = moduleSpecifier.getStart();
        var moduleNameWidth = moduleSpecifier.getWidth();
        var fix = new Lint.Replacement(moduleNameStart, moduleNameWidth, moduleName.toLocaleLowerCase());
        if (!isRelative && moduleName !== moduleName.toLowerCase()) {
            this.addFailure(this.createFailure(moduleNameStart, moduleNameWidth, Rule.FAILURE_STRING, fix));
        }
        // call the base version of this visitor to actually parse this node
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    return NoImportsWalker;
}(Lint.RuleWalker));
