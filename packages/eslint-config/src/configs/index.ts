import { ecmascript } from './ecmascript'

import type { ConfigsTypingMeta } from 'typegen/types'

export const configurations: ConfigsTypingMeta[] = [
  {
    config: ecmascript,
    typingName: 'ECMAScript',
    internalRules: true,
  }
]

export { ecmascript }
