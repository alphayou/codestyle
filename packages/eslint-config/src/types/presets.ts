import type { ConfigBuilder, ConfigNames } from '@/types'

/**
 * Preset name
 */
export type PresetName = 'vanilla'

/**
 * Preset List
 */
export type Presets = Record<PresetName, ConfigNames[]>
