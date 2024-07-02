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
  const typeNames: string[] = []

  // Build rules types for each config source
  let definition = ''

  const getTypes = payload.map(async (item) => {
    const { builder, internal, typeName } = item

    let resolved: Awaitable<TypedConfigItem | TypedConfigItem[]>[] = []

    if (internal) {
      resolved = [
        {
          plugins: {
            '': {
              rules: Object.fromEntries(builtinRules.entries()),
            },
          },
        },
        builder(),
      ]
    }
    else {
      resolved = [builder()]
    }

    const configs = await combine(...resolved)

    typeNames.push(typeName)

    return await flatConfigsToRulesDTS(configs, {
      exportTypeName: typeName,
      includeIgnoreComments: false,
      includeTypeImports: false,
      includeAugmentation: false,
    })
  })

  const types = await Promise.all(getTypes)

  definition += types

  let ruleTypes = ''
  // Build Augmentation
  for (let index = 0; index < typeNames.length; index++) {
    const typeName = typeNames[index]

    if (index === typeNames.length - 1) {
      ruleTypes += typeName
    }
    else {
      ruleTypes += `${typeName}, `
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
