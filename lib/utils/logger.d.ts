export interface ILogger {
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
export declare class Logger implements ILogger {
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
