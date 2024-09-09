import type { ConfigsTypingMeta } from './types'
import { consola } from 'consola'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { combine } from '@/utils'
import { builtinRules } from 'eslint/use-at-your-own-risk'

interface RulesTypingPayload {
  data: string
  exportTypeNames: string[]
}

export async function genRulesTyping(configurations: ConfigsTypingMeta[]): Promise<RulesTypingPayload> {
  // initialize file content
  let target = '/* eslint-disable */\n/* prettier-ignore */\n\n'
  target += '// Alpha You\'s ESLint Configurations - autogen\n'
  target += 'import type { Linter } from \'eslint\'\n'

  // progress counter
  let count = 1
  const totalCount = configurations.length

  // exportTypeNames array
  const exportTypeNames = []

  for (const payload of configurations) {
    consola.start(`[${count}/${totalCount}] Generating for ${payload.typingName}...`)
    const workingConfigs = await combine(
      payload.config(),
      // include internal rules if specified
      payload.internalRules
        ? {
          plugins: {
            '': {
              rules: Object.fromEntries(builtinRules.entries()),
            }
          }
        }
        : {}
    )

    let dts = await flatConfigsToRulesDTS(workingConfigs, {
      includeAugmentation: false,
      includeTypeImports: false,
      includeIgnoreComments: false,
      exportTypeName: payload.typingName + 'Rules',
    })

    // add to exportTypeNames
    exportTypeNames.push(payload.typingName)

    target += dts + '\n\n'

    // resolve linking
    if (payload.linking) {
      consola.start(`(${payload.typingName}) Resolving rules linking...`)
      target += `// (${payload.typingName}) Linking\n`
      for (const link of payload.linking) {
        target += `export interface ${payload.typingName}Rules extends ${link}Rules {}\n`
      }
      consola.success(`(${payload.typingName}) Linked`)
    }

    target += '\n'

    consola.success(`[${count}/${totalCount}] Generated ${payload.typingName}`)

    count++
  }

  // generate AllRules
  let allDefinitions = '// Combination\n'
  allDefinitions += 'export type AllRules = '

  for (let i = 0; i < exportTypeNames.length; i++) {
    allDefinitions += `${exportTypeNames[i]}Rules`
    allDefinitions += i === exportTypeNames.length - 1 ? '' : ' & '
  }

  target += allDefinitions + '\n\n'

  exportTypeNames.push('All')

  return {
    data: target,
    exportTypeNames,
  }
}
