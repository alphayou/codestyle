import type { ConfigsTypingMeta } from 'typegen/types'
import { ecmascript } from './ecmascript'
import { typescript } from './typescript'
import { style } from './style'
import { ignores } from './ignores'
import { imports } from './sort-imports'
import { jsdoc } from './jsdoc'
import { jsonc } from './jsonc'
import { sortPackageJson, sortTsconfig } from './sort-json'

export const configurations: ConfigsTypingMeta[] = [
  {
    config: ecmascript,
    typingName: 'ECMAScript',
    internalRules: true,
  },
  {
    config: typescript,
    typingName: 'TypeScript',
    linking: ['ECMAScript'],
  },
  {
    config: style,
    typingName: 'Style',
  },
  {
    config: imports,
    typingName: 'Imports',
  },
  {
    config: jsdoc,
    typingName: 'JSDoc',
  },
  {
    config: jsonc,
    typingName: 'JSONC',
  },
  {
    config: ignores,
    typingName: 'Ignores',
  },
]

export {
  ecmascript,
  typescript,
  style,
  jsdoc,
  jsonc,
  sortPackageJson,
  sortTsconfig,
  imports,
  ignores,
}
