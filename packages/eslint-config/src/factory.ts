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

// todo: need optimize
function load(name: PresetName, options: Options) {
  // target array
  let resolved: Awaitable<AllConfigItem[]>[] = []

  // get preset
  const targetPreset = presets[name]

  // store duplicate keys
  const sharedKeys: ConfigNames[] = []

  targetPreset.forEach((key) => {
    // pass options if available
    if (Object.hasOwn(options, key)) {
      resolved.push(configMap[key].builder(options[key], name))
      sharedKeys.push(key)
    } else {
      resolved.push(configMap[key].builder({}, name))
    }
  })

  // cut preset key from options
  const { preset, ...filtered } = options

  // load other configs
  Object.entries(filtered).forEach(([key, configOptions]) => {
    if (!sharedKeys.includes(key as ConfigNames)) {
      resolved.push(configMap[key as ConfigNames].builder(configOptions))
    }
  })

  return resolved
}
