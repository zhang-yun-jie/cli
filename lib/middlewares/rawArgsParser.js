"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let rawArgsValue = [];
function rawArgs() {
    return rawArgsValue;
}
exports.rawArgs = rawArgs;
exports.rawArgsParser = argv => next => args => {
    const { namespace } = args;
    rawArgsValue = namespace ? argv.slice(3) : argv.slice(2);
    next(args);
};
//# sourceMappingURL=rawArgsParser.js.map