import { CommandFunction, Middleware } from '../index';
import { ILogger } from '../utils/logger';
export interface IOptionsAnnotations {
    [optionName: string]: string;
}
export interface IHelpAnnotations {
    params?: string[];
    options?: IOptionsAnnotations;
    [key: string]: any;
}
export interface IHelpDetailedAnnoations extends IHelpAnnotations {
    description?: string;
}
export declare const annotationsMap: Map<CommandFunction, IHelpDetailedAnnoations>;
export declare function help(command: CommandFunction, description: string, annotations?: IHelpAnnotations): CommandFunction;
export declare const withHelp: typeof help;
export declare const helper: (logger: ILogger, argv: string[]) => Middleware;
