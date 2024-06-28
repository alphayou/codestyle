import type { Linter } from 'eslint'
import type { AllRules, StyleRules } from './rules'

export type Awaitable<T> = T | Promise<T>

export type TypedConfigItem<T = {}> = Omit<Linter.FlatConfig<Linter.RulesRecord & T>, 'plugins'> & {
  // relax plugin type restriction
  plugins?: Record<string, any>
}

export type AllConfigItem = TypedConfigItem<AllRules>

export type StyleConfigItem = TypedConfigItem<StyleRules>
