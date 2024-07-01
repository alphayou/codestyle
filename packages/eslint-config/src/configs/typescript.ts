import type { Options, TSConfigItem } from '@/types'
import { isPackageExists } from 'local-pkg'
import { interopDefault } from '@/utils'

export async function typescript(
  options: Options['typescript'] = {}
): Promise<TSConfigItem[]> {
  // parse options
  const tsOptions = options === false
    ? false
    : !isPackageExists('typescript')
      ? false
      : typeof options === 'object'
        ? options
        : {}

  if (tsOptions === false) {
    return []
  }

  const [
    pluginTs,
    parserTs,
  ] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  return [
    {
      name: 'alphayou/typescript/setup',
      plugins: {
        ts: pluginTs
      },
    }
  ]
}
