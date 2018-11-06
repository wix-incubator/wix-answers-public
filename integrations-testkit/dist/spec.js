"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
// import {createServer} from 'http';
var _1 = require(".");
var test_utils_1 = require("./test-utils");
var utils_1 = require("./utils");
var puppeteer = require("puppeteer");
var puppeteer_1 = require("unidriver/puppeteer");
// tslint:disable-next-line:no-var-requires
describe('testkit', function () {
    var cleanups = [];
    afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(cleanups.map(function (fn) { return fn(); }))];
                case 1:
                    _a.sent();
                    cleanups = [];
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls register hook with the relevant encrypted payload', function () { return __awaiter(_this, void 0, void 0, function () {
        var port, registerUrl, integrationData, stop, testkit, data, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.getFreePort()];
                case 1:
                    port = _a.sent();
                    registerUrl = "http://localhost:" + port + "/register";
                    integrationData = test_utils_1.integrationDataBuilder({ registerUrl: registerUrl });
                    stop = test_utils_1.dummyIntegration(integrationData, port);
                    cleanups.push(function () { return stop(); });
                    return [4 /*yield*/, _1.createTestkit(integrationData)];
                case 2:
                    testkit = _a.sent();
                    data = test_utils_1.integrationContextBuilder();
                    return [4 /*yield*/, testkit.triggerRegister(data)];
                case 3:
                    response = _a.sent();
                    chai_1.assert.equal(response, data.tenantId);
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls unregister hook with the relevant encrypted payload', function () { return __awaiter(_this, void 0, void 0, function () {
        var port, unregisterUrl, integrationData, stop, testkit, data, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.getFreePort()];
                case 1:
                    port = _a.sent();
                    unregisterUrl = "http://localhost:" + port + "/unregister";
                    integrationData = test_utils_1.integrationDataBuilder({ unregisterUrl: unregisterUrl });
                    stop = test_utils_1.dummyIntegration(integrationData, port);
                    cleanups.push(stop);
                    return [4 /*yield*/, _1.createTestkit(integrationData)];
                case 2:
                    testkit = _a.sent();
                    data = test_utils_1.integrationContextBuilder();
                    return [4 /*yield*/, testkit.triggerUnregister(data.tenantId)];
                case 3:
                    response = _a.sent();
                    chai_1.assert.equal(response, data.tenantId);
                    return [2 /*return*/];
            }
        });
    }); });
    it('exposes an url with the integration\'s settings visible', function () { return __awaiter(_this, void 0, void 0, function () {
        var port, settingsUrl, integrationData, stop, testkit, tenantId, browser, renderedSettingsUrl, page, frame, driver, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, utils_1.getFreePort()];
                case 1:
                    port = _c.sent();
                    settingsUrl = "http://localhost:" + port + "/settings";
                    integrationData = test_utils_1.integrationDataBuilder({ settingsUrl: settingsUrl });
                    stop = test_utils_1.dummyIntegration(integrationData, port);
                    cleanups.push(function () { return stop(); });
                    return [4 /*yield*/, _1.createTestkit(integrationData)];
                case 2:
                    testkit = _c.sent();
                    tenantId = 'bob';
                    cleanups.push(function () { return testkit.closeServer(); });
                    return [4 /*yield*/, puppeteer.launch()];
                case 3:
                    browser = _c.sent();
                    cleanups.push(function () { return browser.close(); });
                    return [4 /*yield*/, testkit.getRenderedSettingsUrl(tenantId)];
                case 4:
                    renderedSettingsUrl = _c.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 5:
                    page = _c.sent();
                    return [4 /*yield*/, page.goto(renderedSettingsUrl)];
                case 6:
                    _c.sent();
                    frame = page.frames().find(function (f) { return f.name() === 'settings'; });
                    driver = puppeteer_1.pupUniDriver(function () { return frame.$('body'); });
                    _b = (_a = chai_1.assert).equal;
                    return [4 /*yield*/, driver.$('h2').text()];
                case 7:
                    _b.apply(_a, [_c.sent(), tenantId]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('exposes an url with a ticket view sandbox', function () { return __awaiter(_this, void 0, void 0, function () {
        var port, settingsUrl, integrationData, stop, testkit, browser, context, ticketView, page, frame, driver, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, utils_1.getFreePort()];
                case 1:
                    port = _c.sent();
                    settingsUrl = "http://localhost:" + port + "/settings";
                    integrationData = test_utils_1.integrationDataBuilder({
                        settingsUrl: settingsUrl,
                        scriptUrl: "http://localhost:" + port + "/script.js"
                    });
                    stop = test_utils_1.dummyIntegration(integrationData, port);
                    cleanups.push(function () { return stop(); });
                    return [4 /*yield*/, _1.createTestkit(integrationData)];
                case 2:
                    testkit = _c.sent();
                    cleanups.push(function () { return testkit.closeServer(); });
                    return [4 /*yield*/, puppeteer.launch()];
                case 3:
                    browser = _c.sent();
                    cleanups.push(function () { return browser.close(); });
                    context = test_utils_1.ticketContextBuilder();
                    return [4 /*yield*/, testkit.getTicketViewSandboxUrl(context)];
                case 4:
                    ticketView = _c.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 5:
                    page = _c.sent();
                    return [4 /*yield*/, page.goto(ticketView)];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, (new Promise(function (res) {
                            setTimeout(res, 100);
                        }))];
                case 7:
                    _c.sent();
                    frame = page.frames().find(function (f) { return f.name() === 'view'; });
                    driver = puppeteer_1.pupUniDriver(function () { return frame.$('body'); });
                    _b = (_a = chai_1.assert).equal;
                    return [4 /*yield*/, driver.$('h2').text()];
                case 8:
                    _b.apply(_a, [_c.sent(), context.user.email]);
                    return [2 /*return*/];
            }
        });
    }); }).timeout(10000);
});
//# sourceMappingURL=spec.js.map