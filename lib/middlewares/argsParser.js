"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_args_1 = __importDefault(require("@yun-jie/cli-args"));
exports.argsParser = argv => next => args => {
    const { params, options } = cli_args_1.default(argv.slice(2));
    next(Object.assign({}, args, { options,
        params }));
};
//# sourceMappingURL=argsParser.js.map