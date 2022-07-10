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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var supertest_1 = __importDefault(require("supertest"));
var __1 = __importDefault(require(".."));
var utilities_1 = require("../utilities");
var processing_1 = require("../utilities/processing");
var realFileName = 'santamonica';
var wrongFileName = 'John';
var validWidth = 2000;
var negativeWidth = -500;
var invalidWidth = 'uedf';
var validHeight = 2000;
var negativeHeight = -500;
var invalidHeight = 'dskde';
var resutFlderPth = path_1.default.join((0, utilities_1.getImagesDire)(), 'Result');
var project = (0, supertest_1.default)(__1.default);
describe('Testing the whole project performance', function () {
    beforeAll(function () {
        if (fs_1.default.existsSync(resutFlderPth)) {
            fs_1.default.rmSync(resutFlderPth, { recursive: true, force: true });
            console.log('Result Folder has been removed');
        }
    });
    describe('Testing end points', function () {
        it('test root route', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, project.get('/')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.text).toBe('root route');
                        return [2 /*return*/];
                }
            });
        }); });
        it('test request with real file name', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, project.get('/images?filename=' + realFileName)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('test request with real file name and valid width and height', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, project.get("/images?filename=".concat(realFileName, "&&width=").concat(validWidth, "&&height=").concat(validHeight))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(fs_1.default.existsSync(path_1.default.join(resutFlderPth, "".concat(realFileName, " with height of ").concat(validHeight, " & width of ").concat(validWidth, ".jpg")))).toBeFalsy;
                        return [2 /*return*/];
                }
            });
        }); });
        it('test request with real file name and negative width and height', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, project.get("/images?filename=".concat(realFileName, "&&width=").concat(negativeWidth, "&&height=").concat(negativeHeight))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Testing functions', function () {
        it('Testing getImagesDire', function () {
            var response = (0, utilities_1.getImagesDire)();
            expect(response).toContain('images');
        });
        it('Testing processImage with valid parameters', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, processing_1.processImage)(realFileName, validWidth, validHeight)];
                    case 1:
                        image = _a.sent();
                        expect(image).toEqual(path_1.default.join((0, utilities_1.getImagesDire)(), 'Result', "".concat(realFileName, " with height of ").concat(validHeight, " & width of ").concat(validWidth, ".jpg")));
                        return [2 /*return*/];
                }
            });
        }); });
        it('Testing processImage with negative width and height ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, processing_1.processImage)(realFileName, 
                        // the negative numbers are converted to positive before sending then to processImage function
                        Math.abs(negativeWidth), Math.abs(negativeHeight))];
                    case 1:
                        image = _a.sent();
                        expect(image).toEqual(path_1.default.join((0, utilities_1.getImagesDire)(), 'Result', "".concat(realFileName, " with height of ").concat(Math.abs(negativeHeight), " & width of ").concat(Math.abs(negativeWidth), ".jpg")));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Testing errors', function () {
        it('test request with real file name with invalid height or width value', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, project.get("/images?filename=".concat(realFileName, "&height=").concat(invalidHeight, "&width=").concat(invalidWidth))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        expect(response.text).toBe(' Invalid Height/Width value...!! Height and width values should be a number!!');
                        return [2 /*return*/];
                }
            });
        }); });
        it('test request without file name', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, project.get('/images')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        expect(response.text).toBe('The queries must include filename!!');
                        return [2 /*return*/];
                }
            });
        }); });
        it('test request with wrong file name', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, project.get('/images?filename=' + wrongFileName)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        expect(response.text).toBe('filename is invalid only use encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
