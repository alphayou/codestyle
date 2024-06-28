import type { StyleRules } from './rules'

/**
 * Config constructor options
 */
export interface Options {
  /**
   * Code format style tuner
   */
  style?: boolean | StyleOptions
}

/**
 * Specific Overrides
 */
interface Overrides<T = {}> {
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
