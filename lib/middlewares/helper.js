"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const lodash_1 = require("lodash");
const path_1 = require("path");
const options_1 = require("../utils/options");
exports.annotationsMap = new Map();
function printCommandHelp(command, namespace, logger, argv) {
    const annotations = exports.annotationsMap.get(command);
    if (!annotations) {
        logger.log('Documentation not found');
        return;
    }
    const { description, params, options } = annotations;
    const scriptName = namespace || path_1.basename(argv[1]);
    const extra = lodash_1.omit(annotations, ['description', 'params', 'options']);
    const usageOptions = lodash_1.isEmpty(options) ? '' : '[options]';
    const usageParams = !Array.isArray(params) || lodash_1.isEmpty(params) ? '' : `[${params.join(' ')}]`;
    logger.log(`Usage: ${scriptName} ${usageOptions} ${usageParams}\n`);
    if (description) {
        logger.log(`${description}\n`);
    }
    if (!lodash_1.isEmpty(options)) {
        logger.log('Options:\n');
        lodash_1.forEach(options, (value, key) => {
            logger.log(`  ${lodash_1.padEnd(options_1.optionToString(key), 12)}${value}`);
        });
    }
    lodash_1.forEach(extra, (value, key) => {
        logger.log(`\n${lodash_1.capitalize(key)}:\n`);
        logger.log(`${value}\n`);
    });
}
function printDefinitionHelp(definition, namespace, logger) {
    if (!namespace) {
        logger.log('\nCommands:\n');
    }
    Object.keys(definition)
        .sort()
        .forEach(key => {
        const node = definition[key];
        let nextNamespace = namespace ? `${namespace}:${key}` : key;
        if (typeof node === 'function') {
            const annotations = exports.annotationsMap.get(node);
            if (key === 'default') {
                if (!namespace) {
                    return;
                }
                nextNamespace = namespace || key;
            }
            // Add task name
            const funcParams = annotations && annotations.params;
            const logArgs = [chalk_1.default.bold(nextNamespace)];
            // Add task params
            if (Array.isArray(funcParams) && funcParams.length) {
                logArgs[0] += ` [${funcParams.join(' ')}]`;
            }
            // Add description
            if (annotations && annotations.description) {
                const description = annotations.description;
                logArgs[0] = lodash_1.padEnd(logArgs[0], 40); // format
                logArgs.push('-', description.split('\n')[0]);
            }
            // Log
            logger.log(...logArgs);
        }
        else if (typeof node === 'object') {
            printDefinitionHelp(node, nextNamespace, logger);
        }
    });
}
function help(command, description, annotations = {}) {
    // Because the validation above currently gets compiled out,
    // Explictly  validate the function input
    if (typeof command !== 'function') {
        throw new TypeError('First help() argument must be a function');
    }
    if (typeof description !== 'string') {
        throw new TypeError('Second help() argument must be a string');
    }
    const nextAnnotations = Object.assign({}, annotations, { description });
    exports.annotationsMap.set(command, nextAnnotations);
    return command;
}
exports.help = help;
exports.withHelp = help;
exports.helper = (logger, argv) => next => args => {
    const { definition, options, command, namespace } = args;
    if (!options.help) {
        return next(args);
    }
    if (command) {
        printCommandHelp(command, namespace, logger, argv);
    }
    if (namespace === '' &&
        typeof definition === 'object' &&
        (!command || command === definition.default)) {
        printDefinitionHelp(definition, namespace, logger);
    }
};
//# sourceMappingURL=helper.js.map