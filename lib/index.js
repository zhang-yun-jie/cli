"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("@zhangyunjie/middleware");
const middlewares_1 = require("./middlewares");
var middlewares_2 = require("./middlewares");
exports.useMiddlewares = middlewares_2.useMiddlewares;
var helper_1 = require("./middlewares/helper");
exports.help = helper_1.help;
exports.withHelp = helper_1.withHelp;
var rawArgsParser_1 = require("./middlewares/rawArgsParser");
exports.rawArgs = rawArgsParser_1.rawArgs;
class CLIError extends Error {
}
exports.CLIError = CLIError;
function cli(definition, middlewares = middlewares_1.useMiddlewares()) {
    middleware_1.middleware(middlewares)({
        definition,
        namespace: '',
        options: {},
        params: [],
        reject: error => {
            throw error;
        }
    });
}
exports.cli = cli;
//# sourceMappingURL=index.js.map