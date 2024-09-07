import globals from 'globals'

import type { TypedECMAScript } from '@/types/specific'
import type { ECMAScriptOptions } from '@/types/options'

export async function ecmascript(
  options: ECMAScriptOptions = {}
): Promise<TypedECMAScript[]> {
  // parse options
  const { overrides, isEditor } = options

  return [
    {
      name: 'alphayou/ecmascript/setup',
      languageOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        globals: {
          ...globals.browser,
          ...globals.es2024,
          ...globals.node,
        },
        parserOptions: {
          ecmaVersion: 2024,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        }
      }
    },
  ]
}
