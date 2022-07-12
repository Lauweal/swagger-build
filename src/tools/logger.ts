import colors from 'colors/safe'

export class Logger {
  /**
   * 错误日志
   * @param message 
   * @param isExit 
   * @returns 
   */
  static error(message: string, isExit?: boolean) {
    console.log(colors.red(message))
    if (isExit) {
      return process.exit(0)
    }
    return
  }

  static log(message: string, isExit?: boolean) {
    console.log(colors.green(message))
    if (isExit) {
      return process.exit(0)
    }
    return
  }
}