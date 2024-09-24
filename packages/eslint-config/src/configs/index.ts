import { ecmascript } from './ecmascript'
import { typescript } from './typescript'
import { style } from './style'
import { ignores } from './ignores'

import type { ConfigsTypingMeta } from 'typegen/types'

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
    config: ignores,
    typingName: 'Ignores',
  },
]

export {
  ecmascript,
  typescript,
  style,
  ignores,
}
