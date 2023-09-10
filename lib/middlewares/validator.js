"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const index_1 = require("../index");
const options_1 = require("../utils/options");
const helper_1 = require("./helper");
exports.validator = next => args => {
    const { options, command, namespace } = args;
    if (!command) {
        return next(args);
    }
    const annotations = helper_1.annotationsMap.get(command);
    if (typeof annotations !== 'object') {
        return next(args);
    }
    const annotatedOptionsKeys = (annotations && annotations.options && Object.keys(annotations.options)) ||
        [];
    const optionsKeys = Object.keys(options);
    const illegalOptionsKeys = lodash_1.difference(optionsKeys, annotatedOptionsKeys);
    if (annotatedOptionsKeys.length && illegalOptionsKeys.length) {
        const msg = `Illegal option: ${options_1.optionsToString(illegalOptionsKeys)}\n` +
            `Available options: ${options_1.optionsToString(annotatedOptionsKeys)}\n` +
            `Type "${namespace} --help" for more information`;
        throw new index_1.CLIError(msg);
    }
    return next(args);
};
//# sourceMappingURL=validator.js.map