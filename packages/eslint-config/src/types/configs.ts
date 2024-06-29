import type { Linter } from 'eslint'
import type { Options, PresetName } from '@/types'
import type { AllRules, ESRules, StyleRules } from './rules'

export type ConfigBuilder = (options?: Object, preset?: PresetName) => Promise<TypedConfigItem[]>

export type ConfigNames = Exclude<keyof Options, 'preset'>

export type ConfigMap = Record<ConfigNames, ConfigBuilder>

export type TypedConfigItem<T = {}> = Omit<Linter.FlatConfig<Linter.RulesRecord & T>, 'plugins'> & {
  // relax plugin type restriction
  plugins?: Record<string, any>
}

// TypedConfigItem for each scope

export type AllConfigItem = TypedConfigItem<AllRules>

export type StyleConfigItem = TypedConfigItem<StyleRules>

export type ESConfigItem = TypedConfigItem<ESRules>
