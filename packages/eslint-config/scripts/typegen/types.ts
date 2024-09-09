/**
 * @name ConfigsTypingMeta
 * @description metadata for the typing generation
 */
export interface ConfigsTypingMeta {
  /**
   * @name internalRules
   * @description whether including the internal ESLint rules
   */
  internalRules?: boolean

  /**
   * @name typingName
   * @description the name of the type definition
   */
  typingName: string

  /**
   * @name linking
   * @description link with another config
   */
  linking?: string[]

  /**
   * @name config
   * @description the function to get the config object
   * @returns the promised config object
   */
  config: () => Promise<object>
}
