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
exports.processImage = void 0;
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var _1 = require(".");
// This fauction is used to resize the images
var imgOperation = function (inputPath, outputPath, height, width) { return __awaiter(void 0, void 0, void 0, function () {
    var image, metaData, image, metaData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(width && height)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, sharp_1.default)(inputPath).resize({ width: width, height: height }).toFile(outputPath)];
            case 1:
                _a.sent();
                return [3 /*break*/, 8];
            case 2:
                if (!height) return [3 /*break*/, 5];
                image = (0, sharp_1.default)(inputPath);
                return [4 /*yield*/, image.metadata()];
            case 3:
                metaData = _a.sent();
                return [4 /*yield*/, image
                        .resize({
                        width: metaData.width,
                        height: height
                    })
                        .toFile(outputPath)];
            case 4:
                _a.sent();
                return [3 /*break*/, 8];
            case 5:
                if (!width) return [3 /*break*/, 8];
                image = (0, sharp_1.default)(inputPath);
                return [4 /*yield*/, image.metadata()];
            case 6:
                metaData = _a.sent();
                return [4 /*yield*/, image
                        .resize({
                        height: metaData.height,
                        width: width
                    })
                        .toFile(outputPath)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                console.log('The Image has been resized successfuly');
                return [2 /*return*/];
        }
    });
}); };
var processImage = function (filename, width, height) { return __awaiter(void 0, void 0, void 0, function () {
    var imagesDire, originalImagePath, resultedImageName, resultPath, resultedImageName, resultPath, resultedImageName, resultPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imagesDire = (0, _1.getImagesDire)(__dirname);
                originalImagePath = path_1.default.join(imagesDire, 'full', filename + '.jpg');
                if (!!(width || height)) return [3 /*break*/, 1];
                console.log('returning the original image');
                return [2 /*return*/, originalImagePath];
            case 1:
                (0, _1.createResultDire)(imagesDire);
                if (!(height && width)) return [3 /*break*/, 4];
                resultedImageName = "".concat(filename, " with height of ").concat(height, " & width of ").concat(width, ".jpg");
                resultPath = path_1.default.join(imagesDire, 'Result', resultedImageName);
                if (!!(0, _1.imgExistanceCheck)(resultPath)) return [3 /*break*/, 3];
                return [4 /*yield*/, imgOperation(originalImagePath, resultPath, height, width)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/, resultPath];
            case 4:
                if (!height) return [3 /*break*/, 7];
                resultedImageName = "".concat(filename, " with height of ").concat(height, ".jpg");
                resultPath = path_1.default.join(imagesDire, 'Result', resultedImageName);
                if (!!(0, _1.imgExistanceCheck)(resultPath)) return [3 /*break*/, 6];
                return [4 /*yield*/, imgOperation(originalImagePath, resultPath, height, width)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/, resultPath];
            case 7:
                resultedImageName = "".concat(filename, " with width of ").concat(width, ".jpg");
                resultPath = path_1.default.join(imagesDire, 'Result', resultedImageName);
                if (!!(0, _1.imgExistanceCheck)(resultPath)) return [3 /*break*/, 9];
                return [4 /*yield*/, imgOperation(originalImagePath, resultPath, height, width)];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [2 /*return*/, resultPath];
        }
    });
}); };
exports.processImage = processImage;
