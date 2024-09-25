import type { StylisticCustomizeOptions as SCO } from '@stylistic/eslint-plugin'
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import type { ECMAScriptRules, TypeScriptRules } from './rules'

/**
 * @name Overrides
 * @description base options for all configs
 */
export interface Overrides<T = object> {
  /**
   * @name overrides
   * @description overrides for specific rules
   */
  overrides?: T
}

/**
 * @name EditorStatus
 * @description status of the editor environment
 */
export interface EditorStatus {
  /**
   * @name isEditor
   * @description whether the environment is an editor
   */
  isEditor?: boolean
}

export interface Files {
  /**
   * @name files
   * @description files to lint (glob patterns)
   */
  files?: string[]
}

export interface Exts {
  /**
   * @name componentExts
   * @description Additional extensions for components.
   *
   * @example ['vue']
   */
  exts?: string[]
}

/**
 * @name ECMAScriptOptions
 * @description Options for ECMAScript configs
 */
export type ECMAScriptOptions = Overrides<ECMAScriptRules> & EditorStatus

/**
 * @name TypeScriptOptions
 * @description Options for TypeScript configs
 */
export type TypeScriptOptions = Overrides<TypeScriptRules> & Files & Exts & {
  /**
   * @name tsconfigPath
   * @description path to the tsconfig file
   */
  tsconfigPath?: string

  /**
   * @name filesTypeAware
   * @description files to lint with type-aware parser (glob patterns)
   */
  filesTypeAware?: string[]

  /**
   * @name ignoresTypeAware
   * @description files to ignore with type-aware parser (glob patterns)
   */
  ignoresTypeAware?: string[]
}

/**
 * @name StylisticOptions
 * @description Options for Stylistic configs
 */
export type StylisticOptions = Overrides & Pick<SCO, 'indent' | 'quotes' | 'semi'>

/**
 * @name IgnoresOptions
 * @description Options for Ignores configs
 */
export interface IgnoresOptions {
  /**
   * @name ignores
   * @description files to ignore (glob patterns)
   */
  userIgnores?: string[]

  /**
   * @name gitignore
   * @description whether to use gitignore
   */
  gitignore?: boolean | FlatGitignoreOptions
}

/**
 * @name Options
 * @description ALpha You's ESLint configs constructor options
 */
export interface Options {
  /**
   * @name ECMAScriptOptions
   * @description ECMAScript options, can only be overridden
   */
  ecmascript?: ECMAScriptOptions

  /**
   * @name TypeScriptOptions
   * @description TypeScript options
   */
  typescript?: boolean | TypeScriptOptions

  /**
   * @name StylisticOptions
   * @description Stylistic options
   */
  style?: boolean | StylisticOptions

  /**
   * @name IgnoresOptions
   * @description Options for Ignores configs
   */
  ignores?: IgnoresOptions

  /**
   * @name Exts
   * @description Additional extensions for components
   */
  exts?: string[]
}
