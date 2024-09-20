import { ecmascript } from './ecmascript'
import { typescript } from './typescript'
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
    config: ignores,
    typingName: 'Ignores',
  }
]

export {
  ecmascript,
  typescript,
  ignores,
}
