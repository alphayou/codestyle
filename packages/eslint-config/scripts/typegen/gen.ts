import { writeFile } from 'fs/promises'
import { consola } from 'consola'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { combine } from '@/utils'
import { configurations } from '@/configs'
import { builtinRules } from 'eslint/use-at-your-own-risk'

consola.info('ESLint Split Typegen')
consola.start('Generating...')

const startTime = performance.now()

// Initialize file content
let target = '/* eslint-disable */\n/* prettier-ignore */\n\n'
target += '// Alpha You\'s ESLint Configurations - autogen\n'
target += 'import type { Linter } from \'eslint\'\n'

// progress counter
let count = 1;
const totalCount = configurations.length

// exportTypeNames array
const exportTypeNames = []

for (const payload of configurations) {
  consola.start(`[${count}/${totalCount}] Generating ${payload.typingName}...`)
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

  // Add to exportTypeNames
  exportTypeNames.push(payload.typingName)

  target += dts + '\n\n'

  consola.success(`[${count}/${totalCount}] Generated ${payload.typingName}`)
}

consola.success('Generated all configurations')

consola.start('Writing to file...')
await writeFile('src/types/rules.d.ts', target)
consola.success('Wrote to file')

console.log('\n')

// construct specific TypedConfigs
let typingList = '// Alpha You\'s ESLint Typed Configs - autogen\n'
typingList += 'import type { TypedConfigItem } from \'@/types/configs\'\n\n'

consola.start('Generating TypedConfigs...')
for (const typeName of exportTypeNames) {
  typingList += `import type { ${typeName}Rules } from '@/types/rules'\n`
  typingList += `export type ${'Typed' + typeName} = TypedConfigItem<${typeName}Rules>\n`
}
consola.success('Generated TypedConfigs')

consola.start('Writing to file...')
await writeFile('src/types/specific.d.ts', typingList)
consola.success('Wrote to file')

const endTime = performance.now()
const timeDiff = (endTime - startTime).toFixed(2);
consola.success(`Typegen finished in ${timeDiff}ms`)
