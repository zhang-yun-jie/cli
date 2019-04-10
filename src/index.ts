import cliArgs from '@pawelgalazka/cli-args'

import { CLICommandNotFound, CLIIllegalOption } from './utils/errors'
import { Logger } from './utils/logger'
import { middleware, Middleware as GenericMiddleware } from './utils/middleware'

export { help } from './middlewares/helper'

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

export type Middleware = GenericMiddleware<IMiddlewareArguments>

export function cli(commandsModule: CommandsModule) {
  const logger = new Logger()
  try {
    const { params, options } = cliArgs(process.argv.slice(2))

    middleware<IMiddlewareArguments>([])({ options, params, commandsModule })
  } catch (error) {
    if (
      error instanceof CLICommandNotFound ||
      error instanceof CLIIllegalOption
    ) {
      logger.error(error.message)
      process.exit(1)
    } else {
      logger.log(error)
      process.exit(1)
    }
  }
}
