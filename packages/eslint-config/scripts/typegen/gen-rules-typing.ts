import { consola } from 'consola'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import type { ConfigsTypingMeta } from './types'
import { combine } from '@/utils'

interface RulesTypingPayload {
  data: string
  exportTypeNames: string[]
}

export async function genRulesTyping(configurations: ConfigsTypingMeta[]): Promise<RulesTypingPayload> {
  // initialize file content
  let target = '/* prettier-ignore */\n\n'
  target += '// Alpha You\'s ESLint Configurations - autogen\n'
  target += 'import type { Linter } from \'eslint\'\n'

  // progress counter
  const totalCount = configurations.length

  // exportTypeNames array
  const exportTypeNames: string[] = []

  const results = await Promise.all(configurations.map(async (payload, index) => {
    consola.start(`[${index + 1}/${totalCount}] Generating for ${payload.typingName}...`)
    const workingConfigs = await combine(
      payload.config(),
      // include internal rules if specified
      payload.internalRules
        ? {
            plugins: {
              '': {
                rules: Object.fromEntries(builtinRules.entries()),
              },
            },
          }
        : {},
    )

    const dts = await flatConfigsToRulesDTS(workingConfigs, {
      includeAugmentation: false,
      includeTypeImports: false,
      includeIgnoreComments: false,
      exportTypeName: `${payload.typingName}Rules`,
    })

    // add to exportTypeNames
    exportTypeNames.push(payload.typingName)

    let result = `${dts}\n\n`

    // resolve linking
    if (payload.linking) {
      consola.start(`(${payload.typingName}) Resolving rules linking...`)
      result += `// (${payload.typingName}) Linking\n`
      for (const link of payload.linking) {
        result += `export interface ${payload.typingName}Rules extends ${link}Rules {}\n`
      }
      consola.success(`(${payload.typingName}) Linked`)
    }

    result += '\n'

    consola.success(`[${index + 1}/${totalCount}] Generated ${payload.typingName}`)

    return result
  }))

  target += results.join('')

  // generate AllRules
  let allDefinitions = '// Combination\n'
  allDefinitions += 'export type AllRules = '

  for (let i = 0; i < exportTypeNames.length; i++) {
    allDefinitions += `${exportTypeNames[i]}Rules`
    allDefinitions += i === exportTypeNames.length - 1 ? '' : ' & '
  }

  target += `${allDefinitions}\n\n`

  exportTypeNames.push('All')

  return {
    data: target,
    exportTypeNames,
  }
}
