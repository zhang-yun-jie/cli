import { Middleware } from '../index';
import { Logger } from '../utils/logger';
export declare function useMiddlewares(middlewares?: Middleware[], logger?: Logger): import("@zhangyunjie/middleware").Middleware<import("..").IMiddlewareArguments>[];
