"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
exports.errorsHandler = logger => next => args => {
    const reject = (error) => {
        if (error instanceof index_1.CLIError) {
            logger.error(error.message);
            process.exit(1);
        }
        else {
            logger.log(error);
            process.exit(1);
        }
    };
    try {
        next(Object.assign({}, args, { reject }));
    }
    catch (error) {
        reject(error);
    }
};
//# sourceMappingURL=errorsHandler.js.map