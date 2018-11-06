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
var utils_1 = require("./utils");
var express = require("express");
var bodyParser = require("body-parser");
var test_utils_1 = require("./test-utils");
var _1 = require(".");
exports.startSandbox = function (forcePort) { return __awaiter(_this, void 0, void 0, function () {
    var app, integrationData, testkit, port, _a;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                app = express();
                app.use(bodyParser());
                app.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                    var testValue, testValueStr, html;
                    return __generator(this, function (_a) {
                        testValue = test_utils_1.integrationDataBuilder();
                        testValueStr = JSON.stringify(testValue);
                        html = "<html>\n\t\t<h1>Setup Sandbox</h1>\n\t\t<textarea id=\"data\" style=\"width: 442px; height: 251px;\"></textarea>\n\t\t<button onclick=\"setup()\">Setup</button>\n\t\t<script>\n\t\t\tconst valToUse = localStorage.getItem('storedData') || JSON.stringify(" + testValueStr + ", null, 4);\n\t\t\tdocument.querySelector('#data').value = valToUse;\n\n\t\t\tsetup = () => {\n\t\t\t\tconst rawVal = document.querySelector('#data').value;\n\t\t\t\tconst val = btoa(rawVal);\n\t\t\t\tlocalStorage.setItem('storedData', rawVal);\n\t\t\t\tlocation.href = '/setup/' + val;\n\t\t\t}\n\t\t</script>\n\t\t</html>";
                        res.send(html);
                        return [2 /*return*/];
                    });
                }); });
                app.get('/please-setup', function (_, res) {
                    res.send("<h1>Please go <a href=\"/\">to setup first</a>");
                });
                app.post('/trigger-register/:tenantId', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                    var tenantId, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                tenantId = req.params.tenantId;
                                if (!!testkit) return [3 /*break*/, 1];
                                next(new Error('Teskit is not set up, please go to setup again'));
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, testkit.triggerRegister(tenantId)];
                            case 2:
                                data = _a.sent();
                                res.send({ data: data });
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                app.post('/trigger-unregister/:tenantId', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                    var tenantId, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                tenantId = req.params.tenantId;
                                if (!!testkit) return [3 /*break*/, 1];
                                next(new Error('Teskit is not set up, please go to setup again'));
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, testkit.triggerUnregister(tenantId)];
                            case 2:
                                data = _a.sent();
                                res.send({ data: data });
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                app.get('/settings-view/:tenantId', function (req, res) {
                    var tenantId = req.params.tenantId;
                    if (!testkit) {
                        res.send("<h1>Please go <a href=\"/\">to setup first</a>");
                    }
                    else {
                        var url = testkit.getRenderedSettingsUrl(tenantId);
                        console.log({ url: url });
                        res.redirect(url);
                    }
                });
                app.get('/pre-ticket-view', function (_, res) {
                    var testValue = test_utils_1.ticketContextBuilder();
                    var testValueStr = JSON.stringify(testValue);
                    if (!testkit) {
                        res.send("<h1>Please go <a href=\"/\">to setup first</a>");
                    }
                    else {
                        var html = "<html>\n\t\t\t<h1>Ticket View Emulator</h1>\n\t\t\t<textarea id=\"data\" style=\"width: 442px; height: 251px;\"></textarea>\n\t\t\t<button onclick=\"accept()\">Go</button>\n\t\t\t<script>\n\t\t\t\tdocument.querySelector('#data').value = JSON.stringify(" + testValueStr + ", null, 4);\n\t\t\t\taccept = () => {\n\t\t\t\t\tconst val = btoa(document.querySelector('#data').value);\n\t\t\t\t\tlocation.href = '/ticket-view/' + val;\n\t\t\t\t}\n\t\t\t</script>\n\t\t\t</html>";
                        res.send(html);
                    }
                });
                app.get('/ticket-view/:token', function (req, res) {
                    var token = req.params.token;
                    var data = JSON.parse(Buffer.from(token, 'base64').toString());
                    if (!testkit) {
                        res.send("<h1>Please go <a href=\"/\">to setup first</a>");
                    }
                    else {
                        var url = testkit.getTicketViewSandboxUrl(data);
                        res.redirect(url);
                    }
                });
                app.get('/setup/:data', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                    var rawData, data, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 4, , 5]);
                                rawData = req.params.data;
                                data = JSON.parse(Buffer.from(req.params.data, 'base64').toString());
                                if (!testkit) return [3 /*break*/, 2];
                                return [4 /*yield*/, testkit.closeServer()];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [4 /*yield*/, _1.createTestkit(data)];
                            case 3:
                                testkit = _a.sent();
                                integrationData = data;
                                res.redirect('/menu');
                                return [3 /*break*/, 5];
                            case 4:
                                e_1 = _a.sent();
                                res.status(400).send(e_1);
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                app.get('/menu', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                    var html;
                    return __generator(this, function (_a) {
                        if (!testkit || !integrationData) {
                            res.redirect('/please-setup');
                        }
                        else {
                            html = "<html>\n\t\t\t<script>\n\t\t\t\twindow.settings = () => {\n\t\t\t\t\tconst tenantId = prompt('some tenant id', 'some-id');\n\t\t\t\t\twindow.open('/settings-view/' + tenantId);\n\t\t\t\t}\n\n\t\t\t\tconst post = url => {\n\t\t\t\t\treturn fetch(url, {\n\t\t\t\t\t\tmethod: 'POST',\n\t\t\t\t\t\theaders: {\n\t\t\t\t\t\t\t'Content-Type': 'application/json'\n\t\t\t\t\t\t}\n\t\t\t\t\t}).then(res => res.json())\n\t\t\t\t\t.then((res) => alert('ok - ' + res.data))\n\t\t\t\t\t.catch((e) => {\n\t\t\t\t\t\talert('error!');\n\t\t\t\t\t\tconsole.error(e);\n\t\t\t\t\t});\n\t\t\t\t}\n\n\t\t\t\twindow.register = () => post('/trigger-register/' + prompt('tenant id', 'some-id'));\n\t\t\t\twindow.unregister = () => post('/trigger-unregister/' + prompt('tenant id', 'some-id'));\n\n\t\t\t</script>\n\t\t\t<h1>Sandbox Menu</h1>\n\t\t\t<h2>Loaded integration</h2>\n\t\t\t<pre>\n\t\t\t\t<code>" + JSON.stringify(integrationData, null, 2) + "</code>\n\t\t\t</pre>\n\t\t\t<ul>\n\t\t\t\t<li><button onclick=\"register()\">Trigger register</button></li>\n\t\t\t\t<li><button onclick=\"unregister()\">Trigger unregister</button></li>\n\t\t\t\t<li><button onclick=\"settings()\">Trigger go to settings</button></li>\n\t\t\t\t<li><a href=\"/pre-ticket-view\" target=\"_blank\">Trigger go to ticket page</a></li>\n\t\t\t\t<li><a href=\"/\">Redo setup</a></li>\n\t\t\t</ul>\n\n\t\t\t</html>";
                            res.send(html);
                        }
                        return [2 /*return*/];
                    });
                }); });
                _a = forcePort;
                if (_a) return [3 /*break*/, 2];
                return [4 /*yield*/, utils_1.getFreePort()];
            case 1:
                _a = (_b.sent());
                _b.label = 2;
            case 2:
                port = _a;
                return [2 /*return*/, {
                        close: app.listen(port),
                        url: 'http://localhost:' + port
                    }];
        }
    });
}); };
//# sourceMappingURL=sandbox.js.map