import type { TypeScriptOptions } from '@/types/options'
import { TypedTypeScript } from '@/types/specific'
import { interop } from '@/utils'

export async function typescript(
  options: TypeScriptOptions = {}
): Promise<TypedTypeScript[]> {
  // parse options
  const {
    files,
    exts,
    overrides,
  } = options

  const [
    pluginTs,
    parserTs
  ] = await Promise.all([
    interop(import('@typescript-eslint/eslint-plugin')),
    interop(import('@typescript-eslint/parser'))
  ])

  return [
    {
      name: 'alphayou/typescript/setup',
      plugins: {
        ts: pluginTs,
      }
    }
  ]
}
