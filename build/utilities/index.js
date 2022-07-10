"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imgExistanceCheck = exports.createResultDire = exports.getImagesDire = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var getImagesDire = function (dire) {
    if (dire === void 0) { dire = __dirname; }
    var imgDire = '';
    var contents = fs_1.default.readdirSync(dire);
    if (contents.includes('images')) {
        imgDire = path_1.default.join(dire, 'images');
    }
    else {
        imgDire = (0, exports.getImagesDire)(path_1.default.join(dire, '..'));
    }
    return imgDire;
};
exports.getImagesDire = getImagesDire;
var createResultDire = function (imagesDire) {
    var resultFolder = path_1.default.join(imagesDire, 'Result');
    if (!fs_1.default.existsSync(resultFolder)) {
        fs_1.default.mkdirSync(resultFolder);
        console.log('Resulted images folder created');
    }
};
exports.createResultDire = createResultDire;
var imgExistanceCheck = function (imgPath) {
    return fs_1.default.existsSync(imgPath);
};
exports.imgExistanceCheck = imgExistanceCheck;
