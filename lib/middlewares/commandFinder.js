"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.commandFinder = next => args => {
    const { definition, params } = args;
    if (typeof definition === 'function') {
        return next(Object.assign({}, args, { command: definition }));
    }
    const namespace = params[0] || '';
    const path = namespace.replace(/:/g, '.');
    const command = lodash_1.get(definition, path);
    const nextParams = params.slice(1);
    if (typeof command === 'function') {
        return next(Object.assign({}, args, { command, namespace, params: nextParams }));
    }
    if (typeof command === 'object') {
        const defaultCommand = command.default;
        if (typeof defaultCommand === 'function') {
            return next(Object.assign({}, args, { command: defaultCommand, namespace, params: nextParams }));
        }
    }
    if (typeof command === 'undefined') {
        const defaultCommand = definition.default;
        if (typeof defaultCommand === 'function') {
            return next(Object.assign({}, args, { command: defaultCommand }));
        }
    }
    return next(Object.assign({}, args, { command: undefined }));
};
//# sourceMappingURL=commandFinder.js.map