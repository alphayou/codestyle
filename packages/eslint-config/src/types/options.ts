import type { TypedConfigItem } from './configs'

/**
 * @name Overrides
 * @description base options for all configs
 */
export interface Overrides {
  /**
   * @name overrides
   * @description overrides for specific rules
   */
  overrides?: TypedConfigItem['rules']
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

/**
 * @name ECMAScriptOptions
 * @description Options for ECMAScript configs
 */
export type ECMAScriptOptions = Overrides & EditorStatus

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
}
