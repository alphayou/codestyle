import { ConfigMap } from '@/types'
import { style } from './style'
import { ecmascript } from './ecmascript'
import { typescript } from './typescript'

export const configMap: ConfigMap = {
  style: {
    typeName: 'StyleRules',
    builder: style,
  },
  ecmascript: {
    typeName: 'ESRules',
    builder: ecmascript,
    internal: true,
  },
  typescript: {
    typeName: 'TSRules',
    builder: typescript
  }
}
