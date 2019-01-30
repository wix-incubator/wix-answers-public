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
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var Cryptr = require("cryptr");
var MongoWrapper = /** @class */ (function () {
    function MongoWrapper(config) {
        var _this = this;
        // ****** WIX ANSWERS CERDS AREA ******/
        this.registerTenant = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var exists, encryptedApiKey, encryptedApiSecret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initCollection.findOne({ _id: data.tenantId })];
                    case 1:
                        exists = _a.sent();
                        if (!exists) {
                            encryptedApiKey = this.cryptr.encrypt(data.keyId);
                            encryptedApiSecret = this.cryptr.encrypt(data.secret);
                            return [2 /*return*/, this.initCollection
                                    .insertOne({ _id: data.tenantId, apiKey: encryptedApiKey, apiSecret: encryptedApiSecret, host: data.host })];
                        }
                        else {
                            throw new Error("Double init for tenant " + data.tenantId);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.getTenantAppKeys = function (tenantId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this.initCollection.findOne({ _id: tenantId })];
        }); }); };
        // ****** INTEGRATION SETTINGS AREA ******/
        this.saveSettingsPerTenant = function (id, data) { return __awaiter(_this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.settingsCollection.findOne({ _id: id })];
                    case 1:
                        exists = _a.sent();
                        if (!exists) {
                            return [2 /*return*/, this.settingsCollection.insert({ _id: id, data: data })];
                        }
                        else {
                            return [2 /*return*/, this.settingsCollection.updateOne({ _id: id }, { $set: { data: data } })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.getSettingsPerTenant = function (id) {
            try {
                return _this.settingsCollection.findOne({ _id: id }).then(function (res) { return res && res.data || {}; });
            }
            catch (e) {
                throw new Error("Error getting saved settings for tenant id " + id + " error: - " + e.message);
            }
        };
        // ****** DELETE INTEGRATION ******/
        this.removeTenant = function (data) { return Promise.all([
            _this.initCollection.remove({ _id: data.tenantId }),
            _this.settingsCollection.remove({ _id: data.tenantId })
        ]); };
        console.log('initiate mongodb wrapper');
        this.config = config;
        this.cryptr = new Cryptr(config.ecryptKey);
        mongodb_1.MongoClient.connect(config.mongoUrl, function (err, client) {
            if (!err) {
                console.log('MongoClient connected successfully to server');
                var db = client.db();
                _this.initCollection = db.collection(config.initDataDB);
                _this.settingsCollection = db.collection(config.settingsDB);
            }
        });
    }
    return MongoWrapper;
}());
exports.MongoWrapper = MongoWrapper;
//# sourceMappingURL=database.js.map