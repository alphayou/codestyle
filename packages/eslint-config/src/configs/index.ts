import { ConfigMap } from '@/types'
import { style } from './style'
import { ecmascript } from './ecmascript'

export const configMap: ConfigMap = {
  style,
  ecmascript,
}

export * from './style'
export * from './ecmascript'
