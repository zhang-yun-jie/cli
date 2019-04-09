import { get } from 'lodash'
import { CLICommandNotFound } from './errors'

export interface ICLIOptions {
  [key: string]: number | string | boolean
}

export type CommandFunction = (options: ICLIOptions, ...args: any[]) => any

export interface ICommandsDictionary {
  [namespace: string]: CommandsModule
}

export interface IMiddlewareArguments {
  options: ICLIOptions
  params: CLIParams
  commandsModule: CommandsModule
}

export interface IInterpreterArguments extends IMiddlewareArguments {
  middlewares?: Middleware[]
}

export type CLIParams = string[]

export type CommandsModule = ICommandsDictionary | CommandFunction

export type MiddlewareThunk = (args: IMiddlewareArguments) => any
export type Middleware = (next: MiddlewareThunk) => MiddlewareThunk

export function interpret({
  options,
  params,
  commandsModule,
  middlewares = []
}: IInterpreterArguments): any {
  const middleware = middlewares.reduce(
    (previousMiddleware, nextMiddleware) => command =>
      nextMiddleware(previousMiddleware(command)),
    (command: CommandFunction) => command
  )
  if (typeof commandsModule === 'function') {
    return middleware(commandsModule)(options, ...params)
  }

  const commandName = (params[0] || '').replace(/:/g, '.')
  const nextParams = params.slice(1)

  const command: CommandsModule | undefined = get(commandsModule, commandName)

  if (typeof command === 'function') {
    return middleware(command)(options, ...nextParams)
  }

  if (typeof command === 'object') {
    const defaultCommand = command.default

    if (typeof defaultCommand === 'function') {
      return middleware(defaultCommand)(options, ...nextParams)
    }
  }

  if (typeof command === 'undefined') {
    const defaultCommand = commandsModule.default

    if (typeof defaultCommand === 'function') {
      return middleware(defaultCommand)(options, ...params)
    }
  }

  throw new CLICommandNotFound()
}
