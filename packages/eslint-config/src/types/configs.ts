import type { Linter } from 'eslint'
import type { Options, PresetName } from '@/types'
import type { AllRules, ESRules, IgnoresRules, JsoncRules, StyleRules, TSRules } from './rules'

// all builder under src/configs fit this pattern

export type ConfigBuilder = (options?: any, preset?: PresetName) => Promise<TypedConfigItem[]>

// the main options key name is almost the same as all configs name, just cut other options
export type ConfigNames = Exclude<keyof Options, 'preset' | 'exts'>

export interface ConfigPayload {
  // for typegen
  typeName: string
  // used across project to access config
  builder: ConfigBuilder
  // for typegen
  internal?: boolean
}

export type ConfigMap = Record<ConfigNames, ConfigPayload>

export type TypedConfigItem<T = Linter.RulesRecord> = Omit<Linter.FlatConfig<Linter.RulesRecord & T>, 'plugins'> & {
  // relax plugin type restriction

  plugins?: Record<string, any>
}

// TypedConfigItem for each scope

export type AllConfigItem = TypedConfigItem<AllRules>

export type StyleConfigItem = TypedConfigItem<StyleRules>

export type ESConfigItem = TypedConfigItem<ESRules>

export type TSConfigItem = TypedConfigItem<TSRules>

export type IgnoresConfigItem = TypedConfigItem<IgnoresRules>

export type JsoncConfigItem = TypedConfigItem<JsoncRules>
