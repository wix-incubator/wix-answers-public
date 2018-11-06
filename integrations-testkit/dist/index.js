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
var axios_1 = require("axios");
var utils_1 = require("./utils");
var express = require("express");
var bodyParser = require("body-parser");
// tslint:disable-next-line:max-line-length
exports.createTestkit = function (integrationData, forcePort) { return __awaiter(_this, void 0, void 0, function () {
    var secret, registerUrl, unregisterUrl, settingsUrl, scriptUrl, jwePromise, jwsPromise, app, port, _a, server;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                secret = integrationData.secret, registerUrl = integrationData.registerUrl, unregisterUrl = integrationData.unregisterUrl, settingsUrl = integrationData.settingsUrl, scriptUrl = integrationData.scriptUrl;
                jwePromise = utils_1.jweInstance(secret);
                jwsPromise = utils_1.jwsInstance(secret);
                app = express();
                app.use(bodyParser());
                app.get('/settings/:tenantId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                    var tenantId, jws, token, html;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                tenantId = req.params.tenantId;
                                return [4 /*yield*/, jwsPromise];
                            case 1:
                                jws = _a.sent();
                                return [4 /*yield*/, jws.sign(JSON.stringify({ tenantId: tenantId }))];
                            case 2:
                                token = _a.sent();
                                html = "<html>\n\t\t<h1>Integration settings</h1>\n\t\t<iframe name=\"settings\" src=\"" + settingsUrl + "?data=" + token + "\"/>\n\t\t</html>";
                                res.send(html);
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.post('/sign', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                    var body, jws, token;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = req.body;
                                return [4 /*yield*/, jwsPromise];
                            case 1:
                                jws = _a.sent();
                                return [4 /*yield*/, jws.sign(JSON.stringify({ context: body.context }))];
                            case 2:
                                token = _a.sent();
                                res.send({ payload: token });
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.get('/ticket-view/:data', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                    var rawData, str, data, html;
                    return __generator(this, function (_a) {
                        rawData = req.params.data;
                        str = Buffer.from(req.params.data, 'base64').toString('utf8');
                        data = JSON.parse(str);
                        html = "<html>\n\t\t<script>\n\t\tlisteners = [];\n\t\tanswersBackofficeSdk = {\n\t\t\teventTypes: {ticketLoaded: 42},\n\t\t\taddListener: (type, cb) => listeners.push(cb),\n\t\t\taddTicketInfoSection: (title, html) => {\n\t\t\t\tconst div = document.createElement('div');\n\t\t\t\tdiv.innerHTML = html;\n\t\t\t\tdocument.body.appendChild(div);\n\t\t\t},\n\t\t\tsign: (id, context) => {\n\t\t\t\treturn fetch('/sign', {\n\t\t\t\t\tmethod: 'POST',\n\t\t\t\t\tbody: JSON.stringify({context}),\n\t\t\t\t\theaders: {\n\t\t\t\t\t\t'Content-Type': 'application/json'\n\t\t\t\t\t}\n\t\t\t\t}).then(res => res.json())\n\t\t\t\t.then(data => data.payload);\n\t\t\t}\n\t\t}\n\n\t\t</script>\n\t\t<script type=\"text/javascript\" src=\"" + scriptUrl + "\"></script>\n\t\t<h1>Ticket page dummy  - [" + data.subject + "]</h1>\n\t\t<pre><code>" + JSON.stringify(data) + "</code></pre>\n\t\t<script>\n\t\t\tconst data = atob('" + rawData + "');\n\t\t\tlisteners.forEach((cb) => cb(JSON.parse(data)));\n\t\t</script>\n\t\t</html>";
                        res.send(html);
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
                server = app.listen(port);
                return [2 /*return*/, {
                        triggerRegister: function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var jwe, encrypted;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, jwePromise];
                                    case 1:
                                        jwe = _a.sent();
                                        return [4 /*yield*/, jwe.encrypt(JSON.stringify(data))];
                                    case 2:
                                        encrypted = _a.sent();
                                        // tslint:disable-next-line:no-console
                                        return [2 /*return*/, axios_1.default.post(registerUrl, encrypted).then(function (res) {
                                                return res.data;
                                            })];
                                }
                            });
                        }); },
                        triggerUnregister: function (tenantId) { return __awaiter(_this, void 0, void 0, function () {
                            var jwe, encrypted;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, jwePromise];
                                    case 1:
                                        jwe = _a.sent();
                                        return [4 /*yield*/, jwe.encrypt(JSON.stringify({ tenantId: tenantId }))];
                                    case 2:
                                        encrypted = _a.sent();
                                        // tslint:disable-next-line:no-console
                                        return [2 /*return*/, axios_1.default.post(unregisterUrl, encrypted).then(function (res) {
                                                return res.data;
                                            })];
                                }
                            });
                        }); },
                        getTicketViewSandboxUrl: function (context) {
                            var data = Buffer.from(JSON.stringify(context)).toString('base64');
                            return "http://localhost:" + port + "/ticket-view/" + data;
                        },
                        getRenderedSettingsUrl: function (tenantId) {
                            var url = "http://localhost:" + port + "/settings/" + tenantId;
                            return url;
                        },
                        closeServer: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, server.close()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }
                    }];
        }
    });
}); };
//# sourceMappingURL=index.js.map