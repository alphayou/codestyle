import type { PresetName } from '@/types'
import type { ESRules, StyleRules } from './rules'
import type { ParserOptions } from '@typescript-eslint/parser'
import type { Linter } from 'eslint'

/**
 * Config constructor options
 */
export interface Options extends Ext {
  /**
   * Configs preset
   * - choose a pre-composed preset
   * @todo
   * @default 'vanilla'
   */
  preset?: PresetName

  /**
   * Code format style tuner
   * @default true
   */
  style?: boolean | StyleOptions

  /**
   * ECMAScript linting tunner
   * - can't be disabled
   */
  ecmascript?: ESOptions

  /**
   * TypeScript linting tunner
   * @default true
   */
  typescript?: boolean | TSOptions

  /**
   * Ignores options
   */
  ignores?: boolean
}

/**
 * Specific Overrides
 */
export interface Overrides<T = Linter.RulesRecord> {
  /**
   * Rules Overrides
   */
  overrides?: T
}

/**
 * Components extensions customization
 */
export interface Ext {
  /**
   * Additional components extensions
   * @example ['vue']
   * @default []
   */
  exts?: string[]
}

/**
 * Code format style options
 */
export interface StyleOptions extends Overrides<StyleRules> {
  /**
   * Indent spaces number
   * @default 2
   */
  indent?: number

  /**
   * Quotes style
   * @default 'single'
   */
  quotes?: 'single' | 'double'

  /**
   * Semicolon
   * @default false
   */
  semi?: boolean

  /**
   * Trailing comma
   * @default 'always-multiline'
   */
  comma?: 'never' | 'always' | 'always-multiline' | 'only-multiline'

  /**
   * JSX supports
   * @default true
   */
  jsx?: boolean
}

/**
 * ECMAScript linting options
 */
export type ESOptions = Overrides<ESRules>

/**
 * TypeScript linting options
 */
export interface TSOptions extends Overrides {
  /**
   * TypeScript parser options
   */
  parserOptions?: Partial<ParserOptions>

  /**
   * tsconfig.json path(s)
   * - when this options is provided, type aware rules will be enabled.
   */
  tsconfig?: string | string[]

  /**
   * Type-aware linting globs
   */
  ta?: {
    include?: string[]
    exclude?: string[]
  }
}
