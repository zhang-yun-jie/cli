"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const index_1 = require("../index");
exports.commandCaller = argv => next => args => {
    const { command, options, params, reject } = args;
    if (!command) {
        const scriptName = path_1.basename(argv[1]);
        throw new index_1.CLIError(`Command not found. Type "${scriptName} --help" for more information.`);
    }
    Promise.resolve(command(options, ...params))
        .then(() => {
        next(args);
    })
        .catch(reject);
};
//# sourceMappingURL=commandCaller.js.map