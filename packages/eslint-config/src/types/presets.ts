import type { ConfigBuilder, ConfigNames } from '@/types'

/**
 * Preset name
 */
export type PresetName = 'vanilla'

export type Presets = Record<PresetName, ConfigNames[]>
