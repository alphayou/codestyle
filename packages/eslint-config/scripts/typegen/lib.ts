import type { Awaitable, ConfigPayload, TypedConfigItem } from '@/types'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'

export async function combine(...configs: Awaitable<TypedConfigItem | TypedConfigItem[]>[]): Promise<TypedConfigItem[]> {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}

const HEADER = `/* eslint-disable */
/* prettier-ignore */
import type { Linter } from 'eslint'
`

export async function typegen(payload: ConfigPayload[]) {
  let output = HEADER
  let typeNames: string[] = []

  // Build rules types for each config source
  let definition = ''
  for (let index = 0; index < payload.length; index++) {
    const { builder, internal } = payload[index]

    let resolved: Awaitable<TypedConfigItem | TypedConfigItem[]>[]

    if (internal) {
      resolved = [
        {
          plugins: {
            '': {
              rules: Object.fromEntries(builtinRules.entries()),
            },
          },
        },
        builder()
      ]
    } else {
      resolved = [
        builder()
      ]
    }

    const configs = await combine(...resolved)

    definition += await flatConfigsToRulesDTS(configs, {
      exportTypeName: payload[index].typeName,
      includeIgnoreComments: false,
      includeTypeImports: false,
      includeAugmentation: false,
    })

    typeNames.push(payload[index].typeName)
  }

  let ruleTypes = ''
  // Build Augmentation
  for (let index = 0; index < typeNames.length; index++) {
    const typeName = typeNames[index]

    if (index !== typeNames.length - 1) {
      ruleTypes += `${typeName}, `
    } else {
      ruleTypes += typeName
    }
  }

//   output += `
// declare module 'eslint' {
//   namespace Linter {
//     interface RulesRecord extends ${ruleTypes} {}
//   }
// }
// `

  output += definition

  output += `\n
export type AllRules = ${ruleTypes.replaceAll(', ', ' & ')}
`

  return output
}
