import type { ConfigsTypingMeta } from 'typegen/types'
import { ecmascript } from './ecmascript'
import { typescript } from './typescript'
import { style } from './style'
import { ignores } from './ignores'
import { imports } from './sort-imports'
import { jsdoc } from './jsdoc'

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
    config: ignores,
    typingName: 'Ignores',
  },
]

export {
  ecmascript,
  typescript,
  style,
  imports,
  ignores,
}
