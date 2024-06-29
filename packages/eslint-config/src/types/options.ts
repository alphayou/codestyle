import type { PresetName } from '@/types'
import type { StyleRules, ESRules } from './rules'

/**
 * Config constructor options
 */
export interface Options {
  /**
   * Configs preset
   * - choose a pre-composed preset
   * @todo
   * @default 'vanilla'
   */
  preset?: PresetName

  /**
   * Code format style tuner
   */
  style?: boolean | StyleOptions

  /**
   * ECMAScript linting tunner
   * - can't be disabled
   */
  ecmascript?: ESOptions
}

/**
 * Specific Overrides
 */
export interface Overrides<T = {}> {
  /**
   * Rules Overrides
   */
  overrides?: T
}

/**
 * Code format style options
 */
export interface StyleOptions extends Overrides<StyleRules> {
  /**
   * Indent spaces number
   * @default 2
   */
  indent?: number,

  /**
   * Quotes style
   * @default 'single'
   */
  quotes?: 'single' | 'double',

  /**
   * Semicolon
   * @default false
   */
  semi?: boolean

  /**
   * Trailing comma
   * @default 'always-multiline'
   */
  comma?: 'never'| 'always' | 'always-multiline' | 'only-multiline',

  /**
   * JSX supports
   * @default true
   */
  jsx?: boolean
}

/**
 * ECMAScript linting options
 */
export interface ESOptions extends Overrides<ESRules> {}
