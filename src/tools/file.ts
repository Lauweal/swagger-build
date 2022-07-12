import fs from 'fs'
import { join } from 'path'
import { Logger } from './logger';

/**
 * 查找可生成文档的文件
 * @param pathname 
 * @returns 
 */
export function findFiles(pathname: string): string[] {
  if (!pathname) return [];
  try {
    const files = fs.readdirSync(pathname)
    return files.reduce((a: string[], b: string) => {
      const filePath = join(pathname, b);
      const state = fs.statSync(filePath)
      if (state.isFile()) return a.concat(filePath)
      return a.concat(findFiles(filePath))
    }, [])
  } catch (error: any) {
    Logger.error(error.message)
    return []
  }
}