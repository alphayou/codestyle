import { ecmascript } from './ecmascript'
import { typescript } from './typescript'

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
  }
]

export { ecmascript }
