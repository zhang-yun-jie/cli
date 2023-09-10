"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    log(...args) {
        console.log(...args);
    }
    warn(...args) {
        console.warn(chalk_1.default.yellow(...args));
    }
    error(...args) {
        console.error(chalk_1.default.red(...args));
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map