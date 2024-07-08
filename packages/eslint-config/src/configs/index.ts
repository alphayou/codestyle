import type { ConfigMap } from '@/types'
import { style } from './style'
import { ecmascript } from './ecmascript'
import { typescript } from './typescript'
import { ignores } from './ignores'
import { jsonc } from './jsonc'

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
    builder: typescript,
  },
  jsonc: {
    typeName: 'JsoncRules',
    builder: jsonc,
  },
  ignores: {
    typeName: 'IgnoresRules',
    builder: ignores,
  },
}
