import { ConfigMap } from '@/types'
import { style } from './style'
import { ecmascript } from './ecmascript'

export const configMap: ConfigMap = {
  style: {
    typeName: 'StyleRules',
    builder: style,
  },
  ecmascript: {
    typeName: 'ESRules',
    builder: ecmascript,
  },
}
