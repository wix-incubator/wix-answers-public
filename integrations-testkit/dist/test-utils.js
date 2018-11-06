"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var express = require("express");
var utils_1 = require("./utils");
var bodyParser = require("body-parser");
exports.dummyIntegration = function (data, port) {
    var app = express();
    var jwePromise = utils_1.jweInstance(data.secret);
    var jwsPromise = utils_1.jwsInstance(data.secret);
    app.use(bodyParser());
    app.post('/register', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var jwe, rr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, jwePromise];
                case 1:
                    jwe = _a.sent();
                    return [4 /*yield*/, jwe.decrypt(req.body)];
                case 2:
                    rr = _a.sent();
                    res.send(rr.tenantId);
                    return [2 /*return*/];
            }
        });
    }); });
    app.post('/unregister', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var jwe, rr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, jwePromise];
                case 1:
                    jwe = _a.sent();
                    return [4 /*yield*/, jwe.decrypt(req.body)];
                case 2:
                    rr = _a.sent();
                    res.send(rr.tenantId);
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/settings', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var token, jws, context;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.query.data;
                    return [4 /*yield*/, jwsPromise];
                case 1:
                    jws = _a.sent();
                    return [4 /*yield*/, jws.verify(token)];
                case 2:
                    context = _a.sent();
                    res.send("<h2>" + context.tenantId + "</h2>");
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/view/:token', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var token, jws, context;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.params.token;
                    return [4 /*yield*/, jwsPromise];
                case 1:
                    jws = _a.sent();
                    return [4 /*yield*/, jws.verify(token)];
                case 2:
                    context = (_a.sent()).context;
                    res.send("<h2>" + context + "</h2>");
                    return [2 /*return*/];
            }
        });
    }); });
    var fullUrl = "http://localhost:" + port;
    app.get('/script.js', function (_, res) { return __awaiter(_this, void 0, void 0, function () {
        var code;
        return __generator(this, function (_a) {
            code = "\n\t\tanswersBackofficeSdk.addListener(answersBackofficeSdk.eventTypes.ticketLoaded, async (t) => {\n\n\t\t\tconst token = await answersBackofficeSdk.sign('" + data.id + "', t.user.email);\n\t\t\tconst url = '" + fullUrl + "/view/' + token;\n\t\t\tanswersBackofficeSdk.addTicketInfoSection('Integration!', '<iframe name=\"view\" src=\"' + url + '\"/>');\n\t\t});\n\t\t";
            res.header('Content-Type', 'application/javascript');
            res.send(code);
            return [2 /*return*/];
        });
    }); });
    var server = app.listen(port);
    return function () { return server.close(); };
};
exports.integrationDataBuilder = function (partial) {
    if (partial === void 0) { partial = {}; }
    return __assign({ id: 'bob', secret: 'abcdefabcdefabcdefabcdefabcdefabcdefabcdefa', registerUrl: '', unregisterUrl: '', settingsUrl: '', scriptUrl: '' }, partial);
};
// tslint:disable-next-line:max-line-length
exports.integrationContextBuilder = function (partial) {
    if (partial === void 0) { partial = {}; }
    return __assign({ keyId: 'bob1', secret: 'bob2', host: 'bob3', tenantId: 'bob4' }, partial);
};
exports.ticketContextBuilder = function (partial) {
    if (partial === void 0) { partial = {}; }
    return __assign({ id: 'bob7', subject: 'dfgdfg', user: {
            email: 'david@rahel.com',
            fullName: 'David Rahel'
        } }, partial);
};
//# sourceMappingURL=test-utils.js.map