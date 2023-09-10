import { Middleware as GenericMiddleware } from '@zhangyunjie/middleware';
export { useMiddlewares } from './middlewares';
export { help, withHelp } from './middlewares/helper';
export { rawArgs } from './middlewares/rawArgsParser';
export declare type CommandFunction = (options: ICLIOptions, ...args: any[]) => any;
export declare type CLIParams = string[];
export declare type CommandsModule = ICommandsDictionary | CommandFunction;
export declare type Middleware = GenericMiddleware<IMiddlewareArguments>;
export interface ICLIOptions {
    [key: string]: number | string | boolean;
}
export interface ICommandsDictionary {
    [namespace: string]: CommandsModule;
}
export interface IMiddlewareArguments {
    options: ICLIOptions;
    params: CLIParams;
    definition: CommandsModule;
    namespace: string;
    command?: CommandFunction;
    reject: (error: Error) => void;
}
export declare class CLIError extends Error {
}
export declare function cli(definition: CommandsModule, middlewares?: Middleware[]): void;
