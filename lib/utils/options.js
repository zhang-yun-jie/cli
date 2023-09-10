"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function optionToString(optionName) {
    return optionName.length === 1 ? `-${optionName}` : `--${optionName}`;
}
exports.optionToString = optionToString;
function optionsToString(optionsKeys) {
    return optionsKeys.map(optionToString).join(' ');
}
exports.optionsToString = optionsToString;
//# sourceMappingURL=options.js.map