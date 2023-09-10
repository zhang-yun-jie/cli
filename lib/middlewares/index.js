"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const argsParser_1 = require("./argsParser");
const commandCaller_1 = require("./commandCaller");
const commandFinder_1 = require("./commandFinder");
const errorsHandler_1 = require("./errorsHandler");
const helper_1 = require("./helper");
const rawArgsParser_1 = require("./rawArgsParser");
const validator_1 = require("./validator");
function useMiddlewares(middlewares = [], logger = new logger_1.Logger()) {
    const argv = process.argv;
    return [
        errorsHandler_1.errorsHandler(logger),
        argsParser_1.argsParser(argv),
        commandFinder_1.commandFinder,
        helper_1.helper(logger, argv),
        validator_1.validator,
        rawArgsParser_1.rawArgsParser(argv),
        ...middlewares,
        commandCaller_1.commandCaller(argv)
    ];
}
exports.useMiddlewares = useMiddlewares;
//# sourceMappingURL=index.js.map