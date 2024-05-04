"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
var ton_1 = require("ton");
var emulator_1 = require("@tact-lang/emulator");
var sample_Proxy_1 = require("./output/sample_Proxy");
describe("contract", function () {
    it("should deploy correcty", function () { return __awaiter(void 0, void 0, void 0, function () {
        var system, owner, user1, user2, proxy, _a, _b, proxy_tracker, _c, proxy_event;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, emulator_1.ContractSystem.create()];
                case 1:
                    system = _d.sent();
                    owner = system.treasure("owner");
                    user1 = system.treasure("user1");
                    user2 = system.treasure("user2");
                    _b = (_a = system).open;
                    return [4 /*yield*/, sample_Proxy_1.Proxy.fromInit(owner.address)];
                case 2:
                    proxy = _b.apply(_a, [_d.sent()]);
                    proxy_tracker = system.track(proxy);
                    return [4 /*yield*/, proxy.send(user1, { value: ton_1.toNano("0.1") }, { $$type: "ProxyMessage", str: "Hello", to: user2.address })];
                case 3:
                    _d.sent();
                    return [4 /*yield*/, system.run()];
                case 4:
                    _d.sent();
                    _c = expect;
                    return [4 /*yield*/, proxy.getGetCount()];
                case 5:
                    _c.apply(void 0, [_d.sent()]).toEqual(1n);
                    proxy_event = proxy_tracker.collect().
                    ;
                    return [2 /*return*/];
            }
        });
    }); });
});
