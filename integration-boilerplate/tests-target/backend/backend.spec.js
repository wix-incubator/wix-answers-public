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
var express = require("express");
var wix_answers_integrations_testkit_1 = require("wix-answers-integrations-testkit");
var backend_1 = require("./backend");
var testConfig = {
    answersIntegrationSecret: 'mXYjQ3DPRNK4tvrq-LFM2d5ZO5_M03yzvtvnxqrtsCI',
    apiPort: 3005,
    integrationId: '1234',
    baseUrl: 'http://localhost',
    ecryptKey: 'testssEXAMPLE',
    mongo: {
        mongoUrl: '',
        initDataDB: '',
        settingsDB: '',
    }
};
var baseUrl = "http://localhost:" + testConfig.apiPort + "/integration";
var initConfig = {
    id: testConfig.integrationId,
    secret: testConfig.answersIntegrationSecret,
    scriptUrl: baseUrl + "/script.js",
    settingsUrl: baseUrl + "/settings",
    registerUrl: baseUrl + "/register",
    unregisterUrl: baseUrl + "/unregister",
    webhooks: {
        TICKET_CREATED: baseUrl + "/webhooks/reply-created",
        REPLY_CREATED: baseUrl + "/webhooks/ticket-created"
    }
};
var payload = {
    keyId: 'myKeyId',
    secret: 'mySecret',
    host: 'test.wixamswers.com',
    tenantId: '123333221'
};
var mockTicketData = {
    tenantId: 'w-w-w-w-w',
    timestamp: 1542796597564,
    payload: {
        id: 'bob7',
        subject: 'dfgdfg',
        user: { email: 'david@rahel.com', fullName: 'David Rahel' },
        content: '',
        channel: 130,
        status: 100,
        priority: 20,
        url: '',
        assignedUser: { email: 'amit@huli.com', fullName: 'Amit Huli' }
    }
};
var mockReplyData = {
    tenantId: 'w-w-w-w-w',
    payload: {
        id: 'bob7',
        user: { email: 'david@rahel.com', fullName: 'David Rahel' },
        parentTicket: mockTicketData.payload
    }
};
var TestMongoWrapper = /** @class */ (function () {
    function TestMongoWrapper() {
        var _this = this;
        this.initDB = {};
        this.settingsDB = {};
        this.registerTenant = function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.initDB[data.tenantId]) {
                    this.initDB[data.tenantId] = data;
                    return [2 /*return*/, data.tenantId];
                }
                return [2 /*return*/];
            });
        }); };
        this.getTenantAppKeys = function (tenantId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.initDB[tenantId] && delete this.initDB[tenantId]];
        }); }); };
        // ****** INTEGRATION SETTINGS AREA ******/
        this.saveSettingsPerTenant = function (id, data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.settingsDB[id] = data;
                return [2 /*return*/, id];
            });
        }); };
        this.getSettingsPerTenant = function (id) {
            return _this.settingsDB[id];
        };
        // ****** DELETE INTEGRATION ******/
        this.removeTenant = function (data) { return _this.initDB[data.tenantId]
            && delete _this.initDB[data.tenantId]
            && delete _this.settingsDB[data.tenantId]; };
    }
    return TestMongoWrapper;
}());
describe('Integration ', function () {
    var app = express();
    var testkit;
    var server;
    var dbDriver;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dbDriver = new TestMongoWrapper();
                    return [4 /*yield*/, wix_answers_integrations_testkit_1.createTestkit(initConfig)];
                case 1:
                    testkit = _a.sent();
                    return [4 /*yield*/, backend_1.initAnswersApi(app, dbDriver, testConfig)];
                case 2:
                    _a.sent();
                    server = app.listen(testConfig.apiPort);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Trigger register user', function () { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testkit.triggerRegister(payload)];
                case 1:
                    res = _a.sent();
                    chai_1.assert.equal(res, payload.tenantId);
                    chai_1.assert.exists(dbDriver.initDB[payload.tenantId]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Trigger ticket-created webhook', function () { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testkit.triggerTicketCreated(mockTicketData)];
                case 1:
                    res = _a.sent();
                    chai_1.assert.deepEqual(res, mockTicketData);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Trigger reply-created webhook', function () { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testkit.triggerReplyCreated(mockReplyData)];
                case 1:
                    res = _a.sent();
                    chai_1.assert.deepEqual(res, mockReplyData);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Trigger unregister user', function () { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testkit.triggerUnregister(payload.tenantId)];
                case 1:
                    res = _a.sent();
                    chai_1.assert.equal(res, payload.tenantId);
                    chai_1.assert.notExists(dbDriver.initDB[payload.tenantId]);
                    return [2 /*return*/];
            }
        });
    }); });
    after(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server.close()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, testkit.closeServer()];
                case 2:
                    _a.sent();
                    dbDriver = undefined;
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=backend.spec.js.map