import { configMap } from '@/configs'
import { presets } from '@/presets'
import type { AllConfigItem, Awaitable, ConfigNames, Options, PresetName } from '@/types'

/**
 * ESLint config constructor
 */
export async function alphayou(
  options: Options = {}
): Promise<AllConfigItem[]> {
  const {
    preset = 'vanilla'
  } = options

  const configs = load(preset, options)

  const resolved = await Promise.all(configs)

  return resolved.flat()
}

function load(name: PresetName, options: Options) {
  let resolved: Awaitable<AllConfigItem[]>[] = []
  const targetPreset = presets[name]
  const sharedKeys: ConfigNames[] = []
  targetPreset.forEach((key) => {
    if (Object.hasOwn(options, key)) {
      resolved.push(configMap[key](options[key], name))
      sharedKeys.push(key)
    } else {
      resolved.push(configMap[key]({}, name))
    }
  })
  const { preset, ...filtered } = options
  Object.entries(filtered).forEach(([key, configOptions]) => {
    if (!sharedKeys.includes(key as ConfigNames)) {
      resolved.push(configMap[key as ConfigNames](configOptions))
    }
  })
  return resolved
}
